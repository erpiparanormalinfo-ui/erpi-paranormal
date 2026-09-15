'use client';
import Link from './navigation';

export function paletteForPath(path:string){
 const root=path.split('/')[1];
 return root==='applications'?'companion':root==='urbex'?'urbex':['communaute','membre','formations','academie','evenements','participer','inscription','reservation'].includes(root)?'community':'paranormal';
}
export function UniverseBar({path}:{path:string}){
 const palette=paletteForPath(path);
 if(palette==='paranormal')return null;
 return <><nav className="universe-bar" aria-label="Univers actuel"><span>UNIVERS / {palette==='companion'?'COMPAGNON':palette==='urbex'?'URBEX':'COMMUNAUTÉ'}</span><Link href="/">Quitter cet univers · Retour à ERPI</Link></nav>{palette==='community'&&<nav className="context-links community-links" aria-label="Dans la communauté">{[['La communauté','/communaute'],['Formations','/formations'],['Rencontres','/evenements'],['Guides gratuits','/academie']].map(([label,url])=><Link key={url} href={url} aria-current={path===url||path.startsWith(url+'/')?'page':undefined}>{label}</Link>)}</nav>}</>;
}
export function UniversePortals(){return <section className="universe-portals"><p className="eyebrow">POUR CONTINUER</p><h2>Que souhaitez-vous faire ?</h2><div><Link href="/rendez-vous">Prendre rendez-vous</Link><Link href="/interventions">Demander une enquête</Link><Link href="/communaute">Participer et se former</Link><Link href="/boutique">S’équiper</Link></div></section>}
export function CommunityHub(){return <>
 <header className="universe-intro"><p className="eyebrow">LE CERCLE ERPI</p><h1>La communauté ERPI.</h1><p className="lead">Un point de rencontre pour les curieux, les témoins et les passionnés. Apprendre la méthode, participer aux rencontres et échanger autour des observations.</p></header>
 <div className="universe-index">
  <Link href="/formations"><span>01</span><div><h2>Les formations.</h2><p>Préparer une investigation ou analyser un enregistrement audio, avec des leçons, des exercices et des corrigés.</p></div><span>Choisir une formation</span></Link>
  <Link href="/evenements"><span>02</span><div><h2>Se rencontrer sur le terrain.</h2><p>Retrouver les sorties, les ateliers et les rencontres ERPI. L’occasion de découvrir la méthode et de poser vos questions.</p></div><span>Voir les rencontres</span></Link>
  <Link href="/academie"><span>03</span><div><h2>Les ressources gratuites.</h2><p>Guides de méthode, utilisation du matériel et repères pour distinguer les observations de leurs interprétations.</p></div><span>Consulter les guides</span></Link>
  <Link href="/membre"><span>04</span><div><h2>L’espace membre.</h2><p>Découvrir l’espace membre et les ressources qui pourront accompagner vos prochaines observations.</p></div><span>L’espace membre</span></Link>
 </div>
 <section className="universe-note"><h2>Des échanges qui gardent du recul.</h2><p>Respecter les témoins, distinguer les faits des interprétations et protéger les lieux privés. Les observations peuvent être discutées sans mettre les personnes en cause.</p></section>
 <section className="space"><h2>Entre deux rencontres.</h2><p>Suivre les vidéos, les coulisses et les prochaines nouvelles de l’équipe.</p><div className="actions"><Link className="button primary" href="/newsletter">Recevoir les nouvelles</Link><Link className="button" href="https://www.youtube.com/@erpiparanormal9160" target="_blank" rel="noreferrer">YouTube</Link><Link className="button" href="https://www.tiktok.com/@erpi_paranormal" target="_blank" rel="noreferrer">TikTok</Link></div></section>
 <UniversePortals/>
 </>}
const notebooks=[
 {id:'lire-un-lieu',title:'Lire un lieu avant de le raconter',intro:'Une fenêtre condamnée, une inscription, une pièce transformée : commencer par décrire ce qui est là.',sections:[
 ['Commencer par le contexte','Avant la visite, noter ce que l’on sait du lieu, l’origine de chaque information et les questions encore ouvertes. Une date gravée, une archive et un souvenir transmis ne disent pas exactement la même chose. Garder cette distinction dans le carnet.'],
 ['Décrire avant d’interpréter','Faire une première lecture d’ensemble : organisation des pièces, matériaux, ouvertures, traces d’usage. Puis noter les détails. Écrire « peinture écaillée autour de la fenêtre » donne un point de départ plus utile que « atmosphère inquiétante ». Le ressenti a sa place, dans une note séparée.'],
 ['Photographier une suite cohérente','Prendre une vue d’ensemble, une vue de contexte et un détail pour chaque observation retenue. Conserver les originaux et un nommage qui permet de retrouver l’ordre de la visite. Une image isolée raconte moins qu’une petite série dont on comprend la relation.'],
 ['Raconter sans exposer','Le récit peut partager une histoire, une texture ou une question sans diffuser un point d’accès. Avant de publier, retirer les informations personnelles visibles et vérifier avec les personnes concernées ce qui peut être montré. La mémoire d’un lieu mérite autant de soin que les images.']
 ]},
 {id:'carnet-de-visite',title:'Construire son carnet de visite',intro:'Un format simple pour conserver les observations et retrouver leur contexte après la sortie.',sections:[
 ['Une page de départ','Noter la date, les personnes présentes, le contexte de la visite autorisée et le thème que l’on souhaite documenter. Ajouter les sources consultées et les limites du parcours convenu. Le carnet sert d’abord à retrouver ce que l’on savait au moment de l’observation.'],
 ['Une entrée par observation','Pour chaque point, garder un horaire, une description brève, le numéro des photos ou du son associé et une question éventuelle. Si plusieurs personnes ont remarqué la même chose, recueillir leurs descriptions séparément avant de les comparer.'],
 ['Les conditions font partie du récit','Éclairage naturel, météo visible, bruits environnants et matériel utilisé aident à relire les documents. Un son capté dans une pièce réverbérante ou une image prise à travers une vitre demandent leur contexte. Ne pas transformer une limite de captation en propriété mystérieuse du lieu.'],
 ['Au retour, conserver les versions','Ranger les originaux avant de sélectionner les images du récit. Distinguer la note prise sur place de l’analyse ajoutée ensuite. Garder une copie de travail pour les annotations et le montage permet de revenir à la source lorsque de nouvelles questions apparaissent.']
 ]}
];
export function Urbex({id}:{id?:string}){
 const item=notebooks.find(n=>n.id===id);
 if(id&&!item)return <header className="universe-intro"><h1>Carnet introuvable.</h1><Link className="button" href="/urbex">Revenir aux carnets urbex</Link></header>;
 if(item)return <><header className="universe-intro"><Link className="textlink" href="/urbex">Les carnets urbex</Link><p className="eyebrow space">OBSERVATION / URBEX & NATURE</p><h1>{item.title}</h1><p className="lead">{item.intro}</p></header><article className="universe-reading">{item.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}<Link className="button" href="/urbex">Retour aux carnets</Link></article></>;
 return <><header className="universe-intro"><p className="eyebrow">URBEX & NATURE</p><h1>Les lieux gardent<br/>des traces.</h1><p className="lead">Architecture oubliée, récits et carnets de terrain. Un espace pour explorer l’histoire des lieux, sans confondre abandon et phénomène paranormal.</p></header>
 <div className="universe-index">{notebooks.map((n,i)=><Link key={n.id} href={'/urbex/'+n.id}><span>0{i+1}</span><div><h2>{n.title}</h2><p>{n.intro}</p></div><span>Lire le carnet</span></Link>)}</div>
 <section className="universe-note"><h2>Regarder, documenter, respecter.</h2><p>Les visites présentées dans cet univers doivent être autorisées. Pas d’adresses privées ni d’indications d’accès diffusées. Le projet éditorial privilégie les traces, le contexte et l’histoire des lieux.</p></section>
 <section className="space"><h2>Un lieu, une histoire à proposer ?</h2><p>Vous gérez un lieu ou possédez des archives que vous aimeriez faire découvrir à ERPI ? Parlons du récit et de ce qui peut être partagé.</p><div className="actions"><Link className="button primary" href="/contact">Proposer un sujet</Link><Link className="button" href="/actualites">Le journal ERPI</Link></div></section><UniversePortals/></>;
}
