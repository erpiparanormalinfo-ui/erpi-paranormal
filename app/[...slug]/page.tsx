import {notFound} from 'next/navigation';
import {PageView} from '@/lib/erpi/site';
import {specs,dossiers,products,events,courses,resources} from '@/lib/erpi/data';
export async function generateMetadata({params}:{params:Promise<{slug:string[]}>}){const{slug}=await params;const path='/'+slug.join('/');const record=[...dossiers,...products,...events,...courses,...resources].find(r=>r.id===slug.at(-1));const spec=specs.find(s=>s.path===path);return {title:`${record?.title||spec?.title||'Explorer'} | ERPI Paranormal`,description:'Enquêtes, événements, ressources et espaces ERPI Paranormal.',robots:{index:false,follow:false}}}
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const{slug}=await params;const roots=new Set(specs.map(s=>s.path.split('/')[1]).filter(Boolean));roots.add('inscription');roots.add('plan-du-site');if(!roots.has(slug[0])||slug[0]==='404')notFound();return <PageView key={slug.join('/')} path={'/'+slug.join('/')}/>}
