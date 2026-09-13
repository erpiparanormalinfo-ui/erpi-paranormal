import * as T from 'three';

// A single world, in metres. Camera keyframes travel through the same furnished room.
export function createOfficeWorld(host: HTMLElement, fail: () => void) {
 const renderer = new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap;
 renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;
 renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=1.35;
 renderer.outputColorSpace=T.SRGBColorSpace;
 host.appendChild(renderer.domElement); renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new T.Scene(); scene.background=new T.Color('#15120f');scene.fog=new T.FogExp2('#17120e',.025);
 const camera=new T.PerspectiveCamera(46,1,.08,60);
 const textures:T.Texture[]=[]; const materials:T.Material[]=[]; const geometries:T.BufferGeometry[]=[];
 const material=(color:string,metalness=0,roughness=.7)=>{const m=new T.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m;};
 const walnut=material('#493020',.08,.48), oak=material('#715039'), ebony=material('#151615',.25,.45), brass=material('#aa8150',.7,.3), paper=material('#d7c9a9'), leather=material('#34221b'), green=material('#253a2c',.2,.34), plaster=material('#3d3930'), trim=material('#28221b');
 function mesh(g:T.BufferGeometry,m:T.Material,p:T.Object3D,x:number,y:number,z:number){geometries.push(g);const o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
 const box=(p:T.Object3D,x:number,y:number,z:number,w:number,h:number,d:number,m:T.Material)=>mesh(new T.BoxGeometry(w,h,d),m,p,x,y,z);
 const cyl=(p:T.Object3D,x:number,y:number,z:number,r:number,h:number,m:T.Material,top=r)=>mesh(new T.CylinderGeometry(top,r,h,32),m,p,x,y,z);
 const sphere=(p:T.Object3D,x:number,y:number,z:number,r:number,m:T.Material)=>mesh(new T.SphereGeometry(r,16,12),m,p,x,y,z);
 const group=(x:number,y:number,z:number)=>{const g=new T.Group();g.position.set(x,y,z);scene.add(g);return g;};
 function wire(p:T.Object3D,points:number[][],m:T.Material,r=.009){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v as [number,number,number]))),32,r,5,false),m,p,0,0,0);}
 function surface(draw:(c:CanvasRenderingContext2D)=>void,w=512,h=512){const c=document.createElement('canvas');c.width=w;c.height=h;const ctx=c.getContext('2d')!;draw(ctx);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=4;textures.push(t);return t;}
 const grain=surface(c=>{c.fillStyle='#866748';c.fillRect(0,0,512,512);for(let i=0;i<350;i++){c.strokeStyle=`rgba(29,17,8,${.025+(i%7)*.013})`;c.beginPath();c.moveTo(0,i*1.6);c.bezierCurveTo(150,i*1.6-5,300,i*1.6+8,512,i*1.6);c.stroke();}});walnut.map=grain;
 function page(title:string,subtitle='ERPI / ARCHIVES'){const map=surface(c=>{c.fillStyle='#d1c2a0';c.fillRect(0,0,512,512);c.fillStyle='#453b2e';c.font='22px monospace';c.fillText(subtitle,35,48);c.font='bold 37px Georgia';c.fillText(title,35,110);c.fillRect(35,132,440,2);for(let i=0;i<19;i++){c.globalAlpha=.25+(i%3)*.08;c.fillRect(35,165+i*15,130+(i*67)%295,2)}c.globalAlpha=1;c.strokeStyle='#863c2c';c.lineWidth=3;c.strokeRect(305,355,150,78);c.font='18px monospace';c.fillStyle='#863c2c';c.fillText('DOCUMENT',321,400);});const m=material('#ffffff');m.map=map;return m;}
 function sheet(p:T.Object3D,x:number,y:number,z:number,w:number,d:number,m:T.Material,angle=0){const o=mesh(new T.PlaneGeometry(w,d),m,p,x,y,z);o.rotation.set(-Math.PI/2,0,angle);return o;}
 function desk(x:number,z:number,w=3.8,d=1.9){const g=group(x,0,z);box(g,0,1.32,0,w,.14,d,walnut);box(g,0,1.19,0,w-.12,.14,d-.12,trim);for(const a of [-1,1])for(const b of [-1,1]){box(g,a*(w/2-.18),.62,b*(d/2-.18),.13,1.24,.13,walnut)}for(let i=0;i<3;i++){box(g,-w/2+.53,1.01-i*.24,0,.85,.21,d-.3,walnut);box(g,-w/2+.53,1.01-i*.24,d/2-.11,.2,.028,.035,brass)}return g;}
 function lamp(p:T.Object3D,x:number,z:number){const g=new T.Group();p.add(g);g.position.set(x,1.42,z);cyl(g,0,0,0,.24,.06,brass);cyl(g,0,.37,0,.026,.72,brass);wire(g,[[0,.7,0],[0,.96,0],[.24,1.01,0],[.38,.84,0]],brass,.027);const shade=cyl(g,.38,.78,0,.28,.3,green,.11);shade.rotation.z=-.18;const bulbMat=material('#ffe1aa');bulbMat.emissive=new T.Color('#ffcc86');bulbMat.emissiveIntensity=2;sphere(g,.38,.64,0,.072,bulbMat);const light=new T.SpotLight('#ffd49a',28,9,.95,.65,1.5);light.position.set(.38,.63,0);light.target.position.set(.3,-.3,.15);light.castShadow=true;light.shadow.mapSize.set(1024,1024);light.shadow.bias=-.001;g.add(light,light.target);return g;}
 // Architecture: continuous plank floor, plaster walls and timber panelling.
 box(scene,0,-.12,-6.5,14,.2,29,walnut);
 for(let i=0;i<29;i++){box(scene,0,-.006,7.7-i,14,.012,.016,trim)}
 for(const x of [-7,7]){box(scene,x,2.6,-6.5,.18,5.2,29,plaster);box(scene,x*.986,.64,-6.5,.12,1.28,29,walnut);box(scene,x*.976,1.33,-6.5,.16,.065,29,brass);for(let z=7;z>-21;z-=1.3)box(scene,x*.979,.66,z,.08,1.2,.035,trim)}
 box(scene,0,2.6,-21,14,5.2,.2,plaster);box(scene,0,5.25,-6.5,14,.12,29,trim);
 const ambient=new T.HemisphereLight('#d3c4a5','#342012',1.35);scene.add(ambient);
 const fill=new T.DirectionalLight('#9aaeb4',1.5);fill.position.set(-5,7,5);scene.add(fill);
 for(const z of [2,-6,-14]){const l=new T.PointLight('#ffd6a2',32,12,2);l.position.set(3,4,z);scene.add(l);cyl(scene,3,4.95,z,.35,.14,ebony);}
 // Bookcases create genuine foreground occlusion as the camera travels.
 for(const z of [-1,-9,-17]){const shelf=group(-6.45,0,z);box(shelf,0,1.55,0,.55,3.1,2.5,walnut);for(let row=0;row<4;row++){box(shelf,.33,.5+row*.66,0,.7,.065,2.5,oak);for(let i=0;i<13;i++){const m=[leather,green,trim,oak][(i+row)%4];box(shelf,.38,.76+row*.66,-1.12+i*.18,.44,.43+(i%3)*.04,.125,m)}}}
 const desktop=desk(1,1.2);lamp(desktop,-1.05,-.4);
 box(desktop,.2,1.415,.1,1.22,.03,.81,leather);sheet(desktop,.18,1.436,.1,1.12,.73,page('DOSSIER 014'),-.08);
 for(let i=0;i<4;i++){const folder=box(desktop,1.15,1.42+i*.035,-.15,.7,.027,.95,i%2?paper:oak);folder.rotation.y=.12+i*.015}sheet(desktop,1.15,1.56,-.15,.61,.81,page('ENQUÊTE'),.12);
 const cameraModel=new T.Group();desktop.add(cameraModel);cameraModel.position.set(.78,1.57,.57);cameraModel.rotation.y=-.27;box(cameraModel,0,0,0,.45,.28,.18,ebony);box(cameraModel,0,.17,-.02,.18,.08,.16,ebony);const lens=cyl(cameraModel,0,0,.19,.12,.22,ebony);lens.rotation.x=Math.PI/2;const glass=cyl(cameraModel,0,0,.31,.095,.014,material('#304944',.7,.12));glass.rotation.x=Math.PI/2;cyl(cameraModel,.15,.16,0,.035,.025,brass);
 box(desktop,-.25,1.455,.48,.45,.025,.025,brass).rotation.y=.3;
 // Board, printed map, photographs, metal pins and physical red string.
 const board=group(.6,0,-3.65);box(board,0,2.65,0,4.4,2.55,.14,walnut);box(board,0,2.65,.09,4.17,2.32,.05,oak);for(const x of [-1.8,1.8])box(board,x,.8,0,.06,1.6,.09,ebony);
 const mapTex=surface(c=>{c.fillStyle='#b6ad8d';c.fillRect(0,0,512,512);c.strokeStyle='#797b65';for(let i=0;i<24;i++){c.beginPath();for(let j=0;j<18;j++){const x=j*32,y=i*24+Math.sin(j*.8+i)*19;j?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}c.strokeStyle='#b0bfba';c.lineWidth=8;c.beginPath();c.moveTo(200,0);c.bezierCurveTo(420,150,50,250,300,512);c.stroke();c.fillStyle='#45483e';c.font='18px monospace';c.fillText('CARTOGRAPHIE / ERPI',24,40);c.font='12px monospace';['NICE','CASTILLON','MUNSTER'].forEach((s,i)=>c.fillText(s,80+i*90,140+i*120));});const mapMat=material('#ffffff');mapMat.map=mapTex;const map=mesh(new T.PlaneGeometry(2.1,1.8),mapMat,board,-.55,2.65,.13);
 const loader=new T.TextureLoader();['/office-desk.jpg','/office-archives.jpg','/office-field.jpg'].forEach((url,i)=>{const texture=loader.load(url);texture.colorSpace=T.SRGBColorSpace;textures.push(texture);const m=material('#ffffff');m.map=texture;box(board,1.15,3.32-i*.65,.14,.82,.58,.025,paper);const photo=mesh(new T.PlaneGeometry(.73,.43),m,board,1.15,3.36-i*.65,.16);photo.rotation.z=(i-1)*.055;});
 const red=material('#822c23');const pins=[[-1.1,3.1],[-.1,2.5],[-.8,2.05],[1.13,3.55],[1.13,2.9],[1.13,2.25]];pins.forEach(([x,y])=>sphere(board,x,y,.21,.035,red));[[0,1],[1,2],[0,3],[1,4],[2,5]].forEach(([a,b])=>wire(board,[[...pins[a],.205],[(pins[a][0]+pins[b][0])/2,(pins[a][1]+pins[b][1])/2-.08,.23],[...pins[b],.205]],red,.007));
 // Archive table with a luminous glass top and layered documents.
 const archives=desk(-3.1,-7.1,3.6,2);const glow=material('#e7d5a7');glow.emissive=new T.Color('#cdb783');glow.emissiveIntensity=.65;box(archives,0,1.415,0,2.7,.035,1.55,glow);
 for(let i=0;i<5;i++)sheet(archives,-.8+(i%3)*.68,1.448+i*.008,-.36+Math.floor(i/3)*.55,.68,.85,page(['LA PRESSE','ARCHIVES','TÉMOINS','ERPI','NOTES'][i],'REVUE DE PRESSE'),(i-2)*.13);
 const magnify=new T.Group();archives.add(magnify);magnify.position.set(.83,1.5,.5);const ring=mesh(new T.TorusGeometry(.17,.025,8,32),brass,magnify,0,0,0);ring.rotation.x=Math.PI/2;box(magnify,.28,0,0,.26,.035,.055,leather);lamp(archives,-1.42,-.6);
 // Testimony station: rotary telephone, notebook and an ajar door.
 const testimony=desk(3.7,-10,2.5,1.5);box(testimony,.25,1.49,.15,.7,.16,.5,ebony);const dial=cyl(testimony,.25,1.58,.2,.18,.025,brass);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;cyl(testimony,.25+Math.cos(a)*.125,1.601,.2+Math.sin(a)*.125,.028,.009,ebony)}
 wire(testimony,[[-.15,1.69,-.12],[-.1,1.84,-.12],[.6,1.84,-.12],[.65,1.69,-.12]],ebony,.072);for(const x of [-.15,.65])cyl(testimony,x,1.69,-.12,.105,.13,ebony);
 const coil:number[][]=[];for(let i=0;i<180;i++)coil.push([-.28+Math.cos(i*.75)*.035,1.68-i*.005,-.1+Math.sin(i*.75)*.035]);wire(testimony,coil,ebony,.008);sheet(testimony,-.65,1.404,.15,.47,.68,page('TÉMOIGNAGE'),-.17);lamp(testimony,-.8,-.45);
 const doorway=group(5.7,0,-12);box(doorway,-.95,1.75,0,.14,3.5,.2,walnut);box(doorway,.95,1.75,0,.14,3.5,.2,walnut);box(doorway,0,3.48,0,2,.14,.2,walnut);const door=new T.Group();door.position.set(-.86,0,0);door.rotation.y=-.36;doorway.add(door);box(door,.86,1.7,0,1.72,3.4,.08,walnut);for(let i=0;i<2;i++)box(door,.86,1+i*1.35,.052,1.3,.92,.03,trim);sphere(door,1.52,1.62,.11,.045,brass);const doorwayLight=new T.PointLight('#ffddac',35,7,2);doorwayLight.position.set(5.7,1.8,-13);scene.add(doorwayLight);
 // Open field case: hinged lid, foam, recorder and measurement instruments.
 const field=desk(-3,-14,3.5,1.7);box(field,0,1.53,0,2.1,.28,1.15,ebony);const foam=material('#242625');box(field,0,1.69,0,1.94,.06,1.01,foam);const lid=new T.Group();lid.position.set(0,1.65,-.57);lid.rotation.x=-.22;field.add(lid);box(lid,0,.55,0,2.1,1.1,.1,ebony);box(lid,0,.55,.065,1.92,.93,.07,foam);for(const x of [-.8,.8])box(field,x,1.53,.6,.16,.12,.03,brass);
 const display=material('#8c9c71');display.emissive=new T.Color('#85966c');display.emissiveIntensity=.45;
 for(let i=0;i<3;i++){const x=-.62+i*.6;box(field,x,1.81,0,.39,.19,.68,ebony);box(field,x,1.912,-.11,.29,.012,.23,display);for(let k=0;k<3;k++)cyl(field,x-.1+k*.1,1.92,.11,.028,.025,brass);for(let k=0;k<6;k++)box(field,x,1.916,.21+k*.025,.26,.007,.009,trim)}
 wire(field,[[.65,1.9,-.28],[.68,2.3,-.3],[.72,2.36,-.3]],brass,.018);sheet(field,-1.32,1.41,.1,.45,.6,page('TERRAIN'),.08);
 // Projector: reel mechanism and cone of light occupy real space.
 const projection=desk(2,-17.7,2.5,1.4);box(projection,0,1.72,0,.72,.6,.5,ebony);const projectorLens=cyl(projection,0,1.73,-.43,.16,.45,brass);projectorLens.rotation.x=Math.PI/2;
 const reels:T.Mesh[]=[];for(const x of [-.29,.39]){const reel=mesh(new T.TorusGeometry(.29,.035,8,32),brass,projection,x,2.24,0);reels.push(reel);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;wire(projection,[[x,2.24,0],[x+Math.cos(a)*.26,2.24+Math.sin(a)*.26,0]],brass,.014)}cyl(projection,x,2.24,0,.07,.07,ebony).rotation.x=Math.PI/2;}
 const screenMat=material('#d8c8a4');screenMat.emissive=new T.Color('#b2a58b');screenMat.emissiveIntensity=.42;box(scene,2.2,2.85,-20.1,4.15,2.4,.06,ebony);box(scene,2.2,2.85,-20.05,3.95,2.2,.02,screenMat);
 const titleTex=surface(c=>{c.fillStyle='#c5b792';c.fillRect(0,0,512,512);c.fillStyle='#37382f';c.font='bold 95px monospace';c.fillText('ERPI',138,240);c.font='19px monospace';c.fillText('LES ENQUÊTES EN IMAGES',127,285)});screenMat.map=titleTex;
 const beamMat=new T.MeshBasicMaterial({color:'#e6c68e',transparent:true,opacity:.012,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending});materials.push(beamMat);const beam=mesh(new T.ConeGeometry(1.4,2.15,32,1,true),beamMat,scene,2.05,2.2,-18.92);beam.rotation.x=Math.PI/2;beam.rotation.z=.13;beam.castShadow=false;
 const points=new Float32Array(180*3);for(let i=0;i<180;i++){points[i*3]=Math.sin(i*127.1)*6;points[i*3+1]=.4+(Math.sin(i*31.7)+1)*2;points[i*3+2]=4-(Math.cos(i*71.3)+1)*12;}const dustGeo=new T.BufferGeometry();dustGeo.setAttribute('position',new T.BufferAttribute(points,3));geometries.push(dustGeo);const dustMat=new T.PointsMaterial({color:'#e1c18a',size:.014,transparent:true,opacity:.28,depthWrite:false});materials.push(dustMat);const dust=new T.Points(dustGeo,dustMat);scene.add(dust);
 const positions=[[6,4.4,7.6],[3.2,3.15,1.2],[.8,4.4,-5.3],[6,3.45,-5.7],[.15,3.9,-10.4],[5,3.25,-13.5]].map(v=>new T.Vector3(...v as [number,number,number]));
 const targets=[[-.45,1.2,1.1],[-1,2.6,-3.65],[-1.8,1.2,-7.1],[2.05,1.55,-10],[-1.5,1.45,-14],[.45,2.5,-19.4]].map(v=>new T.Vector3(...v as [number,number,number]));
 const aroundBoard=new T.CubicBezierCurve3(positions[1],new T.Vector3(4.1,3.8,-1.8),new T.Vector3(3.6,4.4,-4.7),positions[2]);
 const path=new T.CatmullRomCurve3(positions,false,'catmullrom',.22),lookPath=new T.CatmullRomCurve3(targets,false,'catmullrom',.22);let desired=0,current=0,raf=0,last=0,visible=true,dead=false;const mouse=new T.Vector2(),look=new T.Vector3();
 function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();}
 function frame(now:number){if(dead)return;raf=requestAnimationFrame(frame);if(!visible||document.hidden||now-last<32)return;const dt=Math.min((now-last)/1000,.1);last=now;current+= (desired-current)*(1-Math.exp(-dt*7));const p=T.MathUtils.clamp(current/5,0,1);if(current>=1&&current<=2)aroundBoard.getPoint(current-1,camera.position);else path.getPoint(p,camera.position);lookPath.getPoint(p,look);camera.position.x+=mouse.x*.075;camera.position.y+=mouse.y*.045;camera.lookAt(look);dust.position.y=Math.sin(now*.00008)*.07;reels.forEach(r=>r.rotation.z=now*.00009);renderer.render(scene,camera);}
 const onMove=(e:PointerEvent)=>{mouse.set(e.clientX/innerWidth-.5,.5-e.clientY/innerHeight)};
 const onLost=(e:Event)=>{e.preventDefault();fail()};renderer.domElement.addEventListener('webglcontextlost',onLost);
 const observer=new ResizeObserver(resize);observer.observe(host);const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{rootMargin:'80px'});visibility.observe(host);window.addEventListener('pointermove',onMove,{passive:true});resize();frame(performance.now());
 return {setProgress(p:number){desired=p;},dispose(){dead=true;cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();window.removeEventListener('pointermove',onMove);renderer.domElement.removeEventListener('webglcontextlost',onLost);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();}};
}
