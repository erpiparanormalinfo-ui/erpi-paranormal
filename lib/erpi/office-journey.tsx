'use client';
import {useEffect,useRef,useState} from 'react';
import Link from './navigation';

// Stops follow the delivered Unreal camera, rather than the former WebGL scene.
const rooms=[
 {name:'Le bureau',image:'bureau',frame:0,title:'Faire la lumière',end:'sur l’inexpliqué.',text:'Écouter, observer, documenter. Entrer dans les lieux et prendre le temps de comprendre ce qui s’y passe.',links:[['Prendre rendez-vous','/rendez-vous'],['Consulter les enquêtes','/dossiers']]},
 {name:'Les lieux',image:'carte',frame:320,title:'Chaque lieu',end:'a son histoire.',text:'Une carte, des témoignages, des observations. Retrouver les enquêtes dans leur contexte, sans exposer les adresses confidentielles.',links:[['Explorer la carte','/carte'],['Signaler un phénomène','/interventions']]},
 {name:'Le matériel',image:'materiel',frame:510,title:'Sur le terrain.',end:'Avec méthode.',text:'Mallette, instruments de mesure et éclairage : découvrir les kits et comprendre la fonction de chaque appareil avant de s’équiper.',links:[['Découvrir la boutique','/boutique'],['Guide du matériel','/materiel']]},
 {name:'Le Compagnon',image:'applications',frame:765,title:'Recueillir sur place.',end:'Rassembler ensuite.',text:'ERPI Companion sur iPhone et le logiciel de bureau : garder les observations, organiser les médias et construire le dossier.',links:[['Découvrir les applications','/applications'],['Le logiciel de bureau','/applications/studio']]},
 {name:'Le coin lecture',image:'archives',frame:1095,title:'Presse',end:'& carnets d’enquête.',text:'Prendre le temps de lire. Retrouvez les articles consacrés à ERPI, leurs sources et les carnets publiés dans le journal.',links:[['ERPI dans les médias','/medias'],['Le journal','/actualites']]},

];
export function OfficeJourney(){
 const root=useRef<HTMLElement>(null), video=useRef<HTMLVideoElement>(null);

 const chapters=useRef<(HTMLElement|null)[]>([]);
 const [still,setStill]=useState<number|null>(0);
 const [enhanced,setEnhanced]=useState(false),[active,setActive]=useState(0),[failed,setFailed]=useState(false);
 useEffect(()=>{
  const size=matchMedia('(min-width: 850px) and (min-height: 620px)'), motion=matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>setEnhanced(size.matches&&!motion.matches&&document.documentElement.dataset.motion!=='off');
  const observer=new MutationObserver(change);observer.observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});
  size.addEventListener('change',change);motion.addEventListener('change',change);change();
  return()=>{observer.disconnect();size.removeEventListener('change',change);motion.removeEventListener('change',change)};
 },[]);
 useEffect(()=>{
  if(!enhanced||failed)return;
  const player=video.current;if(!player)return;
  let raf=0,motionRaf=0,wanted=0,smoothed=0,from=0,changedAt=0,disposed=false;
  const seek=()=>{if(!disposed&&player.readyState>=1&&!player.seeking&&Math.abs(player.currentTime-smoothed)>.016)player.currentTime=smoothed;};
  const tick=(now:number)=>{motionRaf=0;if(disposed)return;const p=Math.min(1,(now-changedAt)/100);smoothed=from+(wanted-from)*(1-Math.pow(1-p,3));seek();if(p<1)motionRaf=requestAnimationFrame(tick);else root.current?.style.setProperty('--office-blur','0px');};
  const update=()=>{
   raf=0;const host=root.current;if(!host)return;
   const header=document.querySelector('.sitehead')?.getBoundingClientRect().height||96;
   host.style.setProperty('--office-top',header+'px');
   const nodes=chapters.current.filter((n):n is HTMLElement=>!!n);
   if(nodes.length!==rooms.length)return;
   let index=0;
   for(let i=1;i<nodes.length;i++)if(nodes[i].getBoundingClientRect().top<=header)index=i;
   const rect=nodes[index].getBoundingClientRect();
   const local=Math.max(0,Math.min(1,(header-rect.top)/rect.height));
   // A visual hold, not a scroll lock: the camera rests briefly before a longer, gentler camera move.
   const t=Math.max(0,Math.min(1,(local-.4)/.6));
   const eased=t*t*(3-2*t);
   const next=Math.min(index+1,rooms.length-1);
   const target=(rooms[index].frame+(rooms[next].frame-rooms[index].frame)*eased)/60;
   const paused=t===0||index===rooms.length-1;
   if(Math.abs(target-wanted)>.0001){from=smoothed;wanted=target;changedAt=performance.now();if(paused){cancelAnimationFrame(motionRaf);motionRaf=0;smoothed=wanted;from=wanted;seek();}else if(!motionRaf)motionRaf=requestAnimationFrame(tick);}
   host.style.setProperty('--office-blur',paused?'0px':`${Math.min(2,Math.abs(wanted-smoothed)*3)}px`);
   const exitRect=host.querySelector('.office-exit')!.getBoundingClientRect();
   const exit=Math.max(0,Math.min(1,(header+innerHeight*.25-exitRect.top)/exitRect.height));
   host.style.setProperty('--office-exit',String(exit));
   host.dataset.exiting=exit>0?'true':'false';
   setActive(index);setStill(t===0||index===rooms.length-1?index:null);seek();
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const resize=new ResizeObserver(request);if(root.current)resize.observe(root.current);
  player.addEventListener('loadedmetadata',request);player.addEventListener('seeked',seek);
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);request();
  return()=>{disposed=true;resize.disconnect();cancelAnimationFrame(raf);cancelAnimationFrame(motionRaf);player.removeEventListener('loadedmetadata',request);player.removeEventListener('seeked',seek);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);};
 },[enhanced,failed]);
 const immersive=enhanced&&!failed;
 function go(index:number){const el=chapters.current[index];el?.scrollIntoView({behavior:immersive?'smooth':'auto',block:'start'});el?.focus({preventScroll:true})}
 return <section ref={root} className="office-journey" data-shot={active} data-paused={still!==null} data-scroll={immersive?'true':'false'} aria-label="Le bureau d’enquête ERPI">
  <div className="office-stage"><div className="office-visual" aria-hidden="true">
   {immersive?<video className="office-film" ref={video} src="/office-render/journey.mp4" poster="/office-render/bureau.jpg" muted playsInline preload="auto" onError={()=>setFailed(true)}/>:<img className="office-film" src={'/office-render/'+rooms[active].image+'.jpg'} alt=""/>}
   {immersive&&rooms.map((room,i)=><img key={room.image} className="office-film office-still" data-visible={still===i} src={'/office-render/'+room.image+'.jpg'} alt=""/>)}
   <div className="office-grain"/><div className="office-shade"/>
  </div>  {immersive&&<nav className="office-chapters" aria-label="Choisir une zone du bureau"><span>{String(active+1).padStart(2,'0')} / 05 — {rooms[active].name}</span><div>{rooms.map((room,i)=><button key={room.name} onClick={()=>go(i)} aria-current={active===i?'step':undefined} aria-label={room.name}>{String(i+1).padStart(2,'0')}</button>)}</div><a href="#home-news">Actualités</a></nav>}</div>
  <div className="office-script">{rooms.map((room,i)=><section id={'office-chapter-'+i} ref={node=>{chapters.current[i]=node}} className="office-chapter" key={room.name} tabIndex={-1} aria-labelledby={'office-title-'+i}>
   <div className="office-mobile-frame"><img className="office-mobile-image" src={'/office-render/'+room.image+'.jpg'} alt="" loading={i===0?'eager':'lazy'} width={1620} height={1080}/><div className="office-grain" aria-hidden="true"/></div>
   <div className="office-copy"><p className="office-caption">{String(i+1).padStart(2,'0')} / {room.name}</p>{i===0?<h1 id={'office-title-'+i}>{room.title}<br/><em>{room.end}</em></h1>:<h2 id={'office-title-'+i}>{room.title}<br/><em>{room.end}</em></h2>}<p className="office-description">{room.text}</p><div className="office-actions">{room.links.map(([label,href],j)=><Link key={href} href={href} className={i===0&&j===0?'button home-appointment':j===0?'office-link office-link-main':'office-link'} {...(href.startsWith('https')?{target:'_blank',rel:'noreferrer'}:{})}>{label}</Link>)}</div>{i===0&&<div className="office-introduction"><span className="office-scroll-hint">Faites défiler pour passer d’une scène à l’autre</span><a href="#home-news">Les dernières nouvelles</a></div>}</div>
  </section>)}<div className="office-exit" aria-label="Sortie du bureau"><p>Au-delà du bureau</p><a href="#home-news">Retrouver les dernières nouvelles</a></div></div>

 </section>;
}
