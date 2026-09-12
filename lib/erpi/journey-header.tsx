'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {Menu,X,Search,ShoppingBag,UserRound,ChevronDown} from 'lucide-react';
import Link,{usePathname} from './navigation';
const groups=[
 {name:'Découvrir ERPI',intro:'L’entreprise, la méthode, les récits.',links:[['ERPI & sa méthode','/erpi'],['Vidéos','/videos'],['Le journal','/actualites'],['Médias','/medias'],['Soutenir ERPI','/soutenir']]},
 {name:'Les enquêtes',intro:'Observer et comprendre.',links:[['Consulter les dossiers','/dossiers'],['Carte des enquêtes','/carte'],['Ressources','/academie'],['Applications ERPI','/applications']]},
 {name:'Contacter l’équipe',intro:'Un premier échange.',links:[['Un phénomène chez vous ?','/interventions'],['Prendre rendez-vous','/rendez-vous'],['Contacter ERPI','/contact'],['Presse & professionnels','/contact/professionnel']]}
 ,{name:'Boutique',intro:'Équipement et expériences.',links:[['Le matériel','/boutique'],['Les kits ERPI','/kits'],['ERPI Studio · Mac & Windows','/applications/studio'],['Sorties & rencontres','/evenements'],['Formations','/formations']]}
];
export function JourneyHeader({cartCount}:{cartCount:number}){
 const path=usePathname();const[mobile,Mobile]=useState(false);const root=useRef<HTMLElement>(null);
 const close=useCallback(()=>{Mobile(false);root.current?.querySelectorAll('details').forEach(d=>d.open=false)},[]);
 useEffect(()=>{close()},[path,close]);
 useEffect(()=>{const outside=(e:PointerEvent)=>{if(root.current&&!root.current.contains(e.target as Node))close()};const escape=(e:KeyboardEvent)=>{if(e.key==='Escape'){const focused=root.current?.querySelector<HTMLDetailsElement>('details[open]');const toggle=root.current?.querySelector<HTMLButtonElement>('.mobile-menu');if(toggle?.offsetParent)toggle.focus();else focused?.querySelector<HTMLElement>('summary')?.focus();close()}};document.addEventListener('pointerdown',outside);document.addEventListener('keydown',escape);return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)}},[close]);
 return <><a className="skip" href="#main">Aller au contenu</a><header ref={root} className="sitehead journey-header"><Link href="/" className="brand" aria-label="ERPI Paranormal accueil">ERP<b className="neon-i">I</b><span>PARANORMAL</span></Link><button className="mobile-menu" onClick={()=>Mobile(!mobile)} aria-expanded={mobile} aria-controls="journey-navigation">{mobile?<X size={21}/>:<Menu size={21}/>}<span>{mobile?'Fermer':'Menu'}</span></button><nav id="journey-navigation" className={mobile?'is-open':''} aria-label="Navigation principale">{groups.map(g=><details key={g.name} name="journey-menu" className="nav-group"><summary className={g.links.some(([,url])=>path===url||path.startsWith(url+'/'))?'is-current':''}>{g.name}<ChevronDown size={13}/></summary><div className="nav-dropdown"><p>{g.intro}</p>{g.links.map(([label,url])=><Link key={url} href={url} onClick={close} aria-current={path===url?'page':undefined}>{label}</Link>)}</div></details>)}</nav><div className="headtools"><Link aria-label="Rechercher" href="/recherche"><Search size={19}/></Link><Link aria-label="Mon compte" href="/compte"><UserRound size={19}/></Link><Link aria-label={`Panier, ${cartCount} articles`} href="/panier"><ShoppingBag size={19}/>{cartCount>0&&<span>{cartCount}</span>}</Link></div></header></>
}
