'use client';
import {useRef,useState} from 'react';
import Link from './navigation';

export function HomeScene(){
 const scene=useRef<HTMLElement>(null);
 const [examining,setExamining]=useState(false);
 const point=useRef({x:70,y:55});
 function position(x:number,y:number){point.current={x:Math.max(0,Math.min(100,x)),y:Math.max(0,Math.min(100,y))};scene.current?.style.setProperty('--exam-x',point.current.x+'%');scene.current?.style.setProperty('--exam-y',point.current.y+'%')}
 return <section ref={scene} className={'home-darkroom'+(examining?' is-examining':'')} aria-label="Bienvenue chez ERPI Paranormal" onPointerMove={e=>{if(!examining)return;const r=e.currentTarget.getBoundingClientRect();position((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)}}>
  <div className="home-scene-image" aria-hidden="true"/>
  <div className="home-scene-examination" aria-hidden="true"/>
  <div className="home-patina" aria-hidden="true"/>
  <div className="home-scene-copy"><p className="chapter-label">ERPI PARANORMAL · ENQUÊTES & EXPLORATIONS</p><h1>Faire la lumière<br/>sur <em>l’inexpliqué.</em></h1><p>Un bruit. Une présence. Une question.<br/>L’enquête commence là où les certitudes s’arrêtent.</p><div className="home-scene-actions"><Link href="/dossiers" className="button primary">Entrer dans les dossiers</Link><Link href="/erpi" className="home-text-link">Rencontrer ERPI</Link></div></div>
  <div className="home-scene-bottom"><span className="home-scene-coordinate">OBSERVER. DOCUMENTER. COMPRENDRE.</span><div className="home-light-tools"><button type="button" aria-pressed={examining} aria-describedby="home-light-help" onClick={()=>setExamining(!examining)} onKeyDown={e=>{if(e.key==='Escape'){setExamining(false);return}const steps:Record<string,[number,number]>={ArrowLeft:[-5,0],ArrowRight:[5,0],ArrowUp:[0,-5],ArrowDown:[0,5]};if(examining&&steps[e.key]){e.preventDefault();position(point.current.x+steps[e.key][0],point.current.y+steps[e.key][1])}}}><span aria-hidden="true"/>{examining?'Éteindre la lumière d’examen':'Explorer à la lumière'}</button><p id="home-light-help">{examining?'Déplacez le faisceau avec la souris, le doigt ou les touches fléchées.':'Un autre regard sur la chambre noire.'}</p></div></div>
 </section>
}
