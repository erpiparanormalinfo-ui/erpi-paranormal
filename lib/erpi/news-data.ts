export type NewsItem={id:string;title:string;summary:string;kind:string;url:string;publishedAt:string;expiresAt?:string|null;status?:string;pinned?:number;thumbnail?:string;videoId?:string};
export const newsKinds=['Annonce','YouTube','TikTok','Sortie','Article','Presse'];
export const youtubeChannel='UCz-7p-UerJRDPkkjvd62gBQ';
// Snapshot of the official public Atom feed, checked 12 September 2026.
const thumbnailServers:Record<string,number>={'aHdMtbk73DI':2,'3CIOFoBmWv8':4,'YIt35onASfA':2,'LwnXR4806nE':1,'4uE188072yw':1,'R5ikdLy6aBg':3};
export const videoFallback:NewsItem[]=[
 ['aHdMtbk73DI','DES ONVIS VUE EN AMERIQUE !!','2024-12-17T23:22:58Z'],
 ['3CIOFoBmWv8','Foret Aokigahara','2024-12-16T19:31:43Z'],
 ['YIt35onASfA','Vendredi 13','2024-12-14T22:39:15Z'],
 ['LwnXR4806nE','La Mer Du Nord','2024-12-13T13:54:43Z'],
 ['4uE188072yw','Enquête à la clinique du diable','2021-11-19T19:00:04Z'],
 ['R5ikdLy6aBg','ERPI Paranormal / Passage sur AZUR TV.','2020-02-28T18:44:13Z']
].map(([videoId,title,publishedAt])=>({id:'yt-'+videoId,videoId,title,publishedAt,kind:'YouTube',url:'https://www.youtube.com/watch?v='+videoId,summary:'Une publication de la chaîne ERPI Paranormal.',thumbnail:'https://i'+(thumbnailServers[videoId]||1)+'.ytimg.com/vi/'+videoId+'/hqdefault.jpg'}));
export const pressFallback:NewsItem[]=[{id:'nice-matin-2016',kind:'Presse',title:'ERPI dans Nice-Matin : les débuts de Romain et Nicolas',publishedAt:'2016-11-01T08:49:00Z',url:'https://www.nicematin.com/societe/insolite/romain-et-nicolas-traquent-les-esprits-qui-hantent-vos-maisons-90451',summary:'Reportage à Castillon et portrait des fondateurs. Archive du 1er novembre 2016, réservée aux abonnés.'},{id:'dna-2021',kind:'Presse',title:'Une enquête au château du Schwarzenbourg',publishedAt:'2021-08-18T12:00:00Z',url:'https://www.dna.fr/insolite/2021/08/18/grand-format-en-quete-de-fantomes-au-chateau-du-schwarzenbourg',summary:'Reportage des DNA avec Nicolas Vora. Article accessible selon les conditions du média.'},{id:'monaco-2016',kind:'Presse',title:'ERPI sur la Côte d’Azur',publishedAt:'2016-11-16T12:00:00Z',url:'https://www.hellomonaco.com/the-riviera/ghostbusters-of-the-french-riviera/',summary:'HelloMonaco revient sur les débuts de Nicolas Vora et Romain Gorlez.'}];
export function visibleNews(items:NewsItem[],now=Date.now()){return items.filter(i=>i.status!=='draft'&&i.status!=='archived'&&Date.parse(i.publishedAt)<=now&&(!i.expiresAt||Date.parse(i.expiresAt)>now)).sort((a,b)=>(b.pinned||0)-(a.pinned||0)||Date.parse(b.publishedAt)-Date.parse(a.publishedAt));}
export function isRecent(item:NewsItem,now=Date.now()){return now-Date.parse(item.publishedAt)<21*86400000;}

export function editorialNews(item:NewsItem):NewsItem{return item.videoId==='aHdMtbk73DI'?{...item,title:'Observations d’OVNI en Amérique : le sujet en vidéo'}:item}
