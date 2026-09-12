'use client';
import React,{useSyncExternalStore} from 'react';
const eventName='erpi:navigate';
export function navigate(href:string){const url=new URL(href,location.href);if(url.origin!==location.origin){location.assign(url.href);return;}history.pushState(null,'',url.pathname+url.search+url.hash);window.dispatchEvent(new Event(eventName));}
const subscribe=(cb:()=>void)=>{window.addEventListener(eventName,cb);window.addEventListener('popstate',cb);return()=>{window.removeEventListener(eventName,cb);window.removeEventListener('popstate',cb)}};
export function usePathname(){return useSyncExternalStore(subscribe,()=>location.pathname,()=>'/')}
export function useRouter(){return {push:navigate}}
export default function Link({href,children,onClick,...props}:React.AnchorHTMLAttributes<HTMLAnchorElement>&{href:string}){return <a href={href} {...props} onClick={e=>{onClick?.(e);if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||props.target||props.download||href.startsWith('#'))return;const url=new URL(href,location.href);if(url.origin!==location.origin)return;e.preventDefault();navigate(href)}}>{children}</a>}
