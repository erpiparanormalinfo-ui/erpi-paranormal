import {youtubeNews} from '@/lib/erpi/news-server';
import {listAnnouncements} from '@/lib/erpi/supabase-server';
import {pressFallback,visibleNews,type NewsItem} from '@/lib/erpi/news-data';
export const dynamic='force-dynamic';
export async function GET(){const feedPromise=youtubeNews();let editorial:NewsItem[]=[];let editorialAvailable=true;try{editorial=await listAnnouncements(false);}catch{editorialAvailable=false;}const feed=await feedPromise;const items=visibleNews([...editorial,...feed.items,...pressFallback]);const unique=items.filter((item,i)=>items.findIndex(x=>x.url===item.url)===i);return Response.json({items:unique,youtube:feed.state,checkedAt:feed.checkedAt,editorialAvailable,tiktok:'editorial'},{headers:{'Cache-Control':'no-store'}});}
