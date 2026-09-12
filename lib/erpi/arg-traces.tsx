'use client';
import {useEffect,useRef,useState} from 'react';
import {usePathname} from './navigation';
const traces:Record<string,{id:string;label:string;word:string;note:string}>={
 '/':{id:'01',label:'Une marque dans la marge',word:'LU',note:'Le début est sous la lumière. La suite attend dans les dossiers.'},
 '/dossiers':{id:'02',label:'Feuillet sans numéro',word:'MI',note:'Deux lettres au dos du feuillet. Une fréquence persiste dans les vidéos.'},
 '/videos':{id:'03',label:'Réception résiduelle',word:'ÈRE',note:'LU · MI · ÈRE. Assemblez les fragments dans le carnet.'},
 '/actualites':{id:'04',label:'Note du typographe',word:'REFLET',note:'Ce qui semblait illisible attendait seulement un autre point de vue.'},
 '/carte':{id:'05',label:'Point hors carte',word:'NULLE PART',note:'Le lieu n’existe pas. Certaines pistes ne mènent qu’à une histoire.'},
 '/erpi':{id:'06',label:'Trois impulsions',word:'S',note:'Trois points en morse : S. Le silence fait aussi partie du message.'}
};
export function ArgTraces(){const path=usePathname();const[ready,Ready]=useState(false);useEffect(()=>Ready(true),[]);if(!ready||!traces[path])return null;return <Trace key={path} path={path}/>}
function Trace({path}:{path:string}){
 const item=traces[path];const[awake,Awake]=useState(false);const[count,Count]=useState(0);const[found,Found]=useState(false);const[tune,Tune]=useState(82);const[answer,Answer]=useState('');const[code,Code]=useState('');const[solved,Solved]=useState(false);const[feedback,Feedback]=useState('');const[collection,Collection]=useState<string[]>([]);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem('erpi-arg-fragments')||'[]');if(Array.isArray(saved)){const valid=saved.filter((x:unknown)=>typeof x==='string'&&Object.values(traces).some(t=>t.id===x));Collection(valid);Found(valid.includes(item.id))}}catch{}},[item.id]);
 function discover(){Found(true);const next=[...new Set([...collection,item.id])];Collection(next);try{localStorage.setItem('erpi-arg-fragments',JSON.stringify(next))}catch{}}
 return <aside className="arg-trace" aria-label="Indice du jeu d’exploration"><button className="arg-hidden-mark" aria-label="Examiner une trace dans la marge" aria-expanded={awake} onClick={()=>Awake(!awake)}>⟡</button>
 {awake&&!found&&<div className={'arg-object arg-object-'+item.id}>
 {path==='/'&&<><button className="arg-seal" aria-label="Examiner la marque" onClick={()=>{Count(count+1);if(count>=2)discover()}}>III</button><span className="arg-silent-count" aria-live="polite">{count>0?'La marque réagit.':''}</span></>}
 {path==='/dossiers'&&<button className="arg-fold" onClick={discover}><span>Pièce jointe oubliée</span></button>}
 {path==='/videos'&&<><label htmlFor="arg-frequency">Fréquence <output>{tune.toFixed(1)}</output></label><input id="arg-frequency" type="range" min="82" max="92" step="0.1" value={tune} onChange={e=>{const value=Number(e.target.value);Tune(value);if(Math.abs(value-87.4)<.05)discover()}}/></>}
 {path==='/actualites'&&<button className="arg-mirror" onClick={discover}><span>REGARDEZ AUTREMENT</span></button>}
 {path==='/carte'&&<button className="arg-coordinate" onClick={discover}>00° 00′ 00″</button>}
 {path==='/erpi'&&<form onSubmit={e=>{e.preventDefault();if(answer.trim().toUpperCase()==='S')discover();else Feedback('Une seule lettre. En morse, trois points donnent S.')}}><label htmlFor="arg-morse">· · · <span>Quelle lettre en morse ?</span></label><input id="arg-morse" maxLength={8} value={answer} onChange={e=>Answer(e.target.value)} autoComplete="off"/><button type="submit">Décoder</button><p role="status">{feedback}</p></form>}
 </div>}
 {awake&&found&&<div className="arg-found" role="status"><strong>{item.word}</strong><p>{item.note}</p></div>}
 {collection.length>0&&awake&&<button className="arg-notebook-link" onClick={()=>dialog.current?.showModal()}>Carnet des traces {collection.length>0&&`· ${collection.length}/6`}</button>}
 <dialog ref={dialog} className="arg-notebook"><button className="arg-close" onClick={()=>dialog.current?.close()} autoFocus>Fermer le carnet</button><p className="chapter-label">ARCHIVE 00 / JEU DE PISTE</p><h2>Les marges se souviennent.</h2><p>Une fiction à explorer dans les pages éditoriales d’ERPI. Les indices ne font pas partie des enquêtes réelles.</p><ul>{Object.values(traces).map(t=><li key={t.id}><span>{t.id}</span>{collection.includes(t.id)?t.word:'Trace à découvrir'}</li>)}</ul><form onSubmit={e=>{e.preventDefault();if(code.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toUpperCase()==='LUMIERE'){Solved(true);Feedback('')}else Feedback('Le mot se construit avec les trois premières traces.')}}><label htmlFor="arg-key">Le mot qui ouvre l’archive</label><div><input id="arg-key" value={code} onChange={e=>Code(e.target.value)} autoComplete="off" maxLength={30}/><button type="submit">Ouvrir</button></div></form>{solved?<div className="arg-ending" role="status"><h3>Archive 00 — La pièce vide.</h3><p>La lampe éclaire enfin la dernière photographie. Aucune silhouette. Seulement une chaise, et au dos ces mots : « Merci d’avoir pris le temps de regarder. »</p><p>Fin de cette première piste. Vous avez trouvé ce que l’obscurité cachait : une histoire.</p></div>:<p role="status">{feedback}</p>}<small>Progression conservée uniquement dans ce navigateur.</small></dialog>
 </aside>
}
