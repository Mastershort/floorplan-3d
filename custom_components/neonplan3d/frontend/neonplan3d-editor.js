var _t=globalThis,bt=_t.ShadowRoot&&(_t.ShadyCSS===void 0||_t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),Jn=new WeakMap,Ke=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(bt&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Jn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Jn.set(t,e))}return e}toString(){return this.cssText}},Qn=o=>new Ke(typeof o=="string"?o:o+"",void 0,Bt),oe=(o,...e)=>{let t=o.length===1?o[0]:e.reduce((n,i,s)=>n+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+o[s+1],o[0]);return new Ke(t,o,Bt)},ei=(o,e)=>{if(bt)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let n=document.createElement("style"),i=_t.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=t.cssText,o.appendChild(n)}},Ct=bt?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(let n of e.cssRules)t+=n.cssText;return Qn(t)})(o):o;var{is:mr,defineProperty:gr,getOwnPropertyDescriptor:_r,getOwnPropertyNames:br,getOwnPropertySymbols:vr,getPrototypeOf:yr}=Object,vt=globalThis,ti=vt.trustedTypes,wr=ti?ti.emptyScript:"",kr=vt.reactiveElementPolyfillSupport,Ge=(o,e)=>o,Nt={toAttribute(o,e){switch(e){case Boolean:o=o?wr:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},ii=(o,e)=>!mr(o,e),ni={attribute:!0,type:String,converter:Nt,reflect:!1,useDefault:!1,hasChanged:ii};Symbol.metadata??=Symbol("metadata"),vt.litPropertyMetadata??=new WeakMap;var he=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ni){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),i=this.getPropertyDescriptor(e,n,t);i!==void 0&&gr(this.prototype,e,i)}}static getPropertyDescriptor(e,t,n){let{get:i,set:s}=_r(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get:i,set(r){let a=i?.call(this);s?.call(this,r),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ni}static _$Ei(){if(this.hasOwnProperty(Ge("elementProperties")))return;let e=yr(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ge("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ge("properties"))){let t=this.properties,n=[...br(t),...vr(t)];for(let i of n)this.createProperty(i,t[i])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[n,i]of t)this.elementProperties.set(n,i)}this._$Eh=new Map;for(let[t,n]of this.elementProperties){let i=this._$Eu(t,n);i!==void 0&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let i of n)t.unshift(Ct(i))}else e!==void 0&&t.push(Ct(e));return t}static _$Eu(e,t){let n=t.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ei(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,n);if(i!==void 0&&n.reflect===!0){let s=(n.converter?.toAttribute!==void 0?n.converter:Nt).toAttribute(t,n.type);this._$Em=e,s==null?this.removeAttribute(i):this.setAttribute(i,s),this._$Em=null}}_$AK(e,t){let n=this.constructor,i=n._$Eh.get(e);if(i!==void 0&&this._$Em!==i){let s=n.getPropertyOptions(i),r=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Nt;this._$Em=i;let a=r.fromAttribute(t,s.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(e,t,n,i=!1,s){if(e!==void 0){let r=this.constructor;if(i===!1&&(s=this[e]),n??=r.getPropertyOptions(e),!((n.hasChanged??ii)(s,t)||n.useDefault&&n.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(r._$Eu(e,n))))return;this.C(e,t,n)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:i,wrapped:s},r){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,r??t??this[e]),s!==!0||r!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),i===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,s]of this._$Ep)this[i]=s;this._$Ep=void 0}let n=this.constructor.elementProperties;if(n.size>0)for(let[i,s]of n){let{wrapped:r}=s,a=this[i];r!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,s,a)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(n=>n.hostUpdate?.()),this.update(t)):this._$EM()}catch(n){throw e=!1,this._$EM(),n}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};he.elementStyles=[],he.shadowRootOptions={mode:"open"},he[Ge("elementProperties")]=new Map,he[Ge("finalized")]=new Map,kr?.({ReactiveElement:he}),(vt.reactiveElementVersions??=[]).push("2.1.2");var Zt=globalThis,si=o=>o,yt=Zt.trustedTypes,ri=yt?yt.createPolicy("lit-html",{createHTML:o=>o}):void 0,hi="$lit$",ge=`lit$${Math.random().toFixed(9).slice(2)}$`,ui="?"+ge,$r=`<${ui}>`,ke=document,Ue=()=>ke.createComment(""),qe=o=>o===null||typeof o!="object"&&typeof o!="function",Yt=Array.isArray,xr=o=>Yt(o)||typeof o?.[Symbol.iterator]=="function",Kt=`[ 	
\f\r]`,je=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oi=/-->/g,ai=/>/g,ye=RegExp(`>|${Kt}(?:([^\\s"'>=/]+)(${Kt}*=${Kt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),li=/'/g,ci=/"/g,pi=/^(?:script|style|textarea|title)$/i,Jt=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),v=Jt(1),F=Jt(2),Lo=Jt(3),$e=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),di=new WeakMap,we=ke.createTreeWalker(ke,129);function fi(o,e){if(!Yt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return ri!==void 0?ri.createHTML(e):e}var Sr=(o,e)=>{let t=o.length-1,n=[],i,s=e===2?"<svg>":e===3?"<math>":"",r=je;for(let a=0;a<t;a++){let l=o[a],c,d,h=-1,p=0;for(;p<l.length&&(r.lastIndex=p,d=r.exec(l),d!==null);)p=r.lastIndex,r===je?d[1]==="!--"?r=oi:d[1]!==void 0?r=ai:d[2]!==void 0?(pi.test(d[2])&&(i=RegExp("</"+d[2],"g")),r=ye):d[3]!==void 0&&(r=ye):r===ye?d[0]===">"?(r=i??je,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,c=d[1],r=d[3]===void 0?ye:d[3]==='"'?ci:li):r===ci||r===li?r=ye:r===oi||r===ai?r=je:(r=ye,i=void 0);let g=r===ye&&o[a+1].startsWith("/>")?" ":"";s+=r===je?l+$r:h>=0?(n.push(c),l.slice(0,h)+hi+l.slice(h)+ge+g):l+ge+(h===-2?a:g)}return[fi(o,s+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),n]},Xe=class o{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let s=0,r=0,a=e.length-1,l=this.parts,[c,d]=Sr(e,t);if(this.el=o.createElement(c,n),we.currentNode=this.el.content,t===2||t===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(i=we.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let h of i.getAttributeNames())if(h.endsWith(hi)){let p=d[r++],g=i.getAttribute(h).split(ge),f=/([.?@])?(.*)/.exec(p);l.push({type:1,index:s,name:f[2],strings:g,ctor:f[1]==="."?jt:f[1]==="?"?Ut:f[1]==="@"?qt:Ie}),i.removeAttribute(h)}else h.startsWith(ge)&&(l.push({type:6,index:s}),i.removeAttribute(h));if(pi.test(i.tagName)){let h=i.textContent.split(ge),p=h.length-1;if(p>0){i.textContent=yt?yt.emptyScript:"";for(let g=0;g<p;g++)i.append(h[g],Ue()),we.nextNode(),l.push({type:2,index:++s});i.append(h[p],Ue())}}}else if(i.nodeType===8)if(i.data===ui)l.push({type:2,index:s});else{let h=-1;for(;(h=i.data.indexOf(ge,h+1))!==-1;)l.push({type:7,index:s}),h+=ge.length-1}s++}}static createElement(e,t){let n=ke.createElement("template");return n.innerHTML=e,n}};function Ae(o,e,t=o,n){if(e===$e)return e;let i=n!==void 0?t._$Co?.[n]:t._$Cl,s=qe(e)?void 0:e._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),s===void 0?i=void 0:(i=new s(o),i._$AT(o,t,n)),n!==void 0?(t._$Co??=[])[n]=i:t._$Cl=i),i!==void 0&&(e=Ae(o,i._$AS(o,e.values),i,n)),e}var Gt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,i=(e?.creationScope??ke).importNode(t,!0);we.currentNode=i;let s=we.nextNode(),r=0,a=0,l=n[0];for(;l!==void 0;){if(r===l.index){let c;l.type===2?c=new Ze(s,s.nextSibling,this,e):l.type===1?c=new l.ctor(s,l.name,l.strings,this,e):l.type===6&&(c=new Xt(s,this,e)),this._$AV.push(c),l=n[++a]}r!==l?.index&&(s=we.nextNode(),r++)}return we.currentNode=ke,i}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},Ze=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,i){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ae(this,e,t),qe(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==$e&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):xr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&qe(this._$AH)?this._$AA.nextSibling.data=e:this.T(ke.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,i=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Xe.createElement(fi(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===i)this._$AH.p(t);else{let s=new Gt(i,this),r=s.u(this.options);s.p(t),this.T(r),this._$AH=s}}_$AC(e){let t=di.get(e.strings);return t===void 0&&di.set(e.strings,t=new Xe(e)),t}k(e){Yt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,n,i=0;for(let s of e)i===t.length?t.push(n=new o(this.O(Ue()),this.O(Ue()),this,this.options)):n=t[i],n._$AI(s),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let n=si(e).nextSibling;si(e).remove(),e=n}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,i,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=w}_$AI(e,t=this,n,i){let s=this.strings,r=!1;if(s===void 0)e=Ae(this,e,t,0),r=!qe(e)||e!==this._$AH&&e!==$e,r&&(this._$AH=e);else{let a=e,l,c;for(e=s[0],l=0;l<s.length-1;l++)c=Ae(this,a[n+l],t,l),c===$e&&(c=this._$AH[l]),r||=!qe(c)||c!==this._$AH[l],c===w?e=w:e!==w&&(e+=(c??"")+s[l+1]),this._$AH[l]=c}r&&!i&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},jt=class extends Ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}},Ut=class extends Ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}},qt=class extends Ie{constructor(e,t,n,i,s){super(e,t,n,i,s),this.type=5}_$AI(e,t=this){if((e=Ae(this,e,t,0)??w)===$e)return;let n=this._$AH,i=e===w&&n!==w||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,s=e!==w&&(n===w||i);i&&this.element.removeEventListener(this.name,this,n),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xt=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ae(this,e)}};var Mr=Zt.litHtmlPolyfillSupport;Mr?.(Xe,Ze),(Zt.litHtmlVersions??=[]).push("3.3.3");var mi=(o,e,t)=>{let n=t?.renderBefore??e,i=n._$litPart$;if(i===void 0){let s=t?.renderBefore??null;n._$litPart$=i=new Ze(e.insertBefore(Ue(),s),s,void 0,t??{})}return i._$AI(o),i};var Qt=globalThis,ne=class extends he{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=mi(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return $e}};ne._$litElement$=!0,ne.finalized=!0,Qt.litElementHydrateSupport?.({LitElement:ne});var zr=Qt.litElementPolyfillSupport;zr?.({LitElement:ne});(Qt.litElementVersions??=[]).push("4.2.2");async function en(o,e){return(await o.callWS({type:"neonplan3d/image/get",image_id:e})).data}async function wt(o,e,t){await o.callWS({type:"neonplan3d/image/set",image_id:e,data:t})}async function gi(o){return(await o.callWS({type:"neonplan3d/history/list"})).snapshots}async function _i(o){await o.callWS({type:"neonplan3d/history/snapshot"})}async function bi(o,e){return(await o.callWS({type:"neonplan3d/history/restore",snapshot_id:e})).revision}async function vi(o,e){return o.callWS({type:"neonplan3d/packs/import",pack:e})}async function yi(o,e){await o.callWS({type:"neonplan3d/packs/remove",pack_id:e})}var Er="neonplan3d.seenOffers";function wi(o){try{localStorage.setItem(Er,JSON.stringify(o.map(e=>e.id)))}catch{}}var ki="neonplan3d.seenUpdates";function $i(o){let e=[];try{e=JSON.parse(localStorage.getItem(ki)??"[]")}catch{}return o.filter(t=>!e.includes(`${t.id}@${t.release}`))}function xi(o){try{localStorage.setItem(ki,JSON.stringify(o.map(e=>`${e.id}@${e.release}`)))}catch{}}function Si(o,e){return e?`${o}${o.includes("?")?"&":"?"}np_coupon=${encodeURIComponent(e.code)}`:o}function tn(o){return o.callWS({type:"neonplan3d/license/get"})}function nn(o,e){return o.callWS({type:"neonplan3d/license/activate",key:e})}function Mi(o){return o.callWS({type:"neonplan3d/license/remove"})}function zi(o){return o.callWS({type:"neonplan3d/license/refresh"})}function Ei(o){return o.callWS({type:"neonplan3d/backup/export"})}function Fi(o,e,t){return o.callWS({type:"neonplan3d/backup/import",building:e,packs:t})}function Ai(o,e){return o.callWS({type:"neonplan3d/packs/install",pack_id:e})}var Ii=[],sn=new Map,Fr=0;function Ri(o){Ii=o,sn=new Map(o.flatMap(e=>e.items.map(t=>[Ye(e.id,t.id),t]))),Fr++}function Pi(){return Ii}function Ye(o,e){return`pack:${o}:${e}`}function rn(o){return o.startsWith("pack:")}var Ar={"mastershort.living_basics":"mastershort.living","mastershort.kitchen_basics":"mastershort.kitchen","mastershort.bedroom_basics":"mastershort.bedroom","mastershort.bath_basics":"mastershort.bath"};function Ti(o){return ee(o)?.parts.find(e=>e.screen)}function ee(o){if(!rn(o))return;let e=sn.get(o);if(e)return e;let[,t,...n]=o.split(":"),i=Ar[t];return i?sn.get(`pack:${i}:${n.join(":")}`):void 0}function Je(o){return ae[o]??ee(o)?.size??[.6,.6,.8]}function on(o){return Li.has(o)||!!ee(o)?.electric}function Re(o,e){let t=e.split("-")[0];return o.name[t]??o.name.en??Object.values(o.name)[0]??o.id}function an(o,e){let t=ee(e.type);if(e.mount_y!=null)return e.mount_y;if(e.type==="lamp_wall")return Oi;if(e.type==="led_strip")return Math.max(0,o.height-.04-Math.max(.02,e.h));switch(t?.mount){case"surface":return Wi(o,e.x,e.z);case"wall":return t.wall_y??1;case"ceiling":return Math.max(0,o.height-e.h);default:return t?0:Di(e)}}var Hi=["always","no_power","never"],Vi=["gable","hip","pent","flat"],ln={field:null,size:1,right:0,up:0};function cn(o,e,t){return o?e?!!t.lock_plan:!!o.locked:!1}var Bi=["rain","snow","fog","clouds","lightning","sky"],dn=["rain","snow","clouds","lightning","sky"],Ci=["lawn","terrace","path","driveway","pool","bed","hedge","fence"],Ir={lawn:.012,terrace:.12,path:.02,driveway:.02,pool:-.25,bed:.15,hedge:1.2,fence:1};function Rr(o){return o.elevation>.3?0:-.2}function Ni(o,e,t){let n=(o.outdoor??[]).find(i=>i.type!=="hedge"&&i.type!=="fence"&&i.type!=="pool"&&D([e,t],i.points));return Rr(o)+(n?Ir[n.type]:0)}var Pr={meter:null,grid:null,grid_invert:!1,solar:null,battery:null,battery_invert:!1,battery_soc:null,consumption:null,tariff:null},Ki=["wood","oak","tiles","carpet","stone","concrete"],Gi={type:"none",pitch:35,overhang:.4},Tr={wall_exterior:.24,wall_interior:.12,grid:.05,north:0,roof:{...Gi}};function ji(o,e,t){return{id:o,name:e,elevation:t,height:2.5,cut_height:1.15,rooms:[],openings:[],furniture:[],placements:[],background:null,outdoor:[],walls:[],ha_floor:null}}var Or=2.75;function Ui(o,e){if(e!=null&&Number.isFinite(e))return Math.round(e*Or*100)/100;let t=o.reduce((n,i)=>!n||i.elevation>n.elevation?i:n,null);return t?Math.round((t.elevation+t.height+.25)*100)/100:0}function qi(o,e,t){let n=o.rooms.flatMap(a=>a.points.map(l=>l[0])),i=o.rooms.flatMap(a=>a.points.map(l=>l[1])),s=n.length?Math.ceil(Math.max(...n))+1:0,r=i.length?Math.floor(Math.min(...i)):0;return e.map((a,l)=>{let c=s+l%3*4.5,d=r+Math.floor(l/3)*3.5;return{id:t(),name:a.name,area_id:a.area_id,points:[[c,d],[c+4,d],[c+4,d+3],[c,d+3]],floor_material:"wood"}})}function Xi(o,e,t,n){let i=o.rotation*Math.PI/180,s=Math.cos(i),r=Math.sin(i),[a,l]=e,c=o.x-a*(o.w/2)*s+l*(o.d/2)*r,d=o.z-a*(o.w/2)*r-l*(o.d/2)*s,h=t[0]-c,p=t[1]-d,g=b=>Math.max(.1,Math.round(b/n)*n),f=g((h*s+p*r)*a),u=g((-h*r+p*s)*l),y=b=>Math.round(b*1e3)/1e3;return{x:y(c+a*(f/2)*s-l*(u/2)*r),z:y(d+a*(f/2)*r+l*(u/2)*s),w:y(f),d:y(u)}}var Zi=["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_table","lamp_wall","led_strip","lamp_uplight","lamp_bollard","lamp_garden","radiator","sofa","armchair","stool","coffee_table","tv_board","tv_wall","sideboard","shelf","plant","rug","table","table_round","chair","bench","corner_bench","bar_stool","kitchen","kitchen_wall","kitchen_tall","island","worktop","sink","stove","dishwasher","fridge","bed","bunk_bed","nightstand","wardrobe","dresser","bathtub","shower","wc","washbasin","washer","dryer","desk","office_chair","tall_cabinet","coat_rack","stairs","robot_vacuum","inverter","home_battery","wallbox","meter","grid_point","parking","fridge_smart","stairwell"],Yi={lights:["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"],living:["sofa","armchair","stool","coffee_table","tv_board","tv_wall","sideboard","shelf","plant","rug"],dining:["table","table_round","chair","bench","corner_bench","bar_stool"],kitchen:["kitchen","kitchen_wall","kitchen_tall","island","worktop","sink","stove","dishwasher","fridge"],sleeping:["bed","bunk_bed","nightstand","wardrobe","dresser"],bath:["bathtub","shower","wc","washbasin","washer","dryer"],work:["desk","worktop","office_chair","tall_cabinet","coat_rack","radiator","stairs","robot_vacuum"],vehicles:["parking"]},xe=["meter","inverter","home_battery","wallbox","grid_point"],Ji=new Set(["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","lamp_floor","lamp_uplight","lamp_table","lamp_wall","led_strip","lamp_bollard","lamp_garden"]),Oi=1.75;function hn(o){return["lamp_ceiling","lamp_downlight","lamp_spot","lamp_panel","lamp_pendant","stairs","stairwell","parking"].includes(o.type)?!1:ee(o.type)?.mount!=="ceiling"}function ue(o){return Ji.has(o)||!!ee(o)?.light}var Dr=new Set(["table","table_round","coffee_table","desk","nightstand","sideboard","dresser","kitchen","island","worktop","tv_board","dishwasher","washer","dryer"]);function un(o,e,t,n=0){let i=ie(o.points),s=i.x1-i.x0-2*n,r=i.z1-i.z0-2*n,a=[];for(let l=0;l<e;l++)for(let c=0;c<t;c++){let d=[Math.round((i.x0+n+s/t*(c+.5))*1e3)/1e3,Math.round((i.z0+n+r/e*(l+.5))*1e3)/1e3];D(d,o.points)&&a.push(d)}return a}function Pe(o,e,t){let n=r=>Math.round(r*1e3)/1e3,[i,s]={right:[1,0],down:[0,1],left:[-1,0],up:[0,-1]}[t];return[n(o[0]+i*e),n(o[1]+s*e)]}function Di(o){switch(o.type){case"home_battery":return o.variant==="wall"?.5:0;case"kitchen_wall":return 1.45;case"tv_wall":return Math.max(0,1.3-o.h/2);case"radiator":return .12;case"inverter":return 1.1;case"wallbox":return 1;case"meter":return .4;default:return 0}}function Wi(o,e,t){let n=0;for(let i of o.furniture)!(Dr.has(i.type)||ee(i.type)?.surface)||!D([e,t],bn(i))||(n=Math.max(n,i.h));return n}var Li=new Set([...Ji,"radiator","robot_vacuum","inverter","home_battery","wallbox","meter","tv_board","tv_wall","desk","fridge","fridge_smart","stove","kitchen_tall","dishwasher","washer","dryer","kitchen","island","sink"]),ae={sofa:[2.2,.9,.82],armchair:[.85,.85,.8],table:[1.6,.9,.75],chair:[.46,.5,.9],bed:[1.6,2.05,.9],nightstand:[.45,.4,.5],wardrobe:[1.8,.6,2.1],shelf:[.9,.35,1.9],kitchen:[2.4,.62,.92],worktop:[1.2,.62,.91],inverter:[.5,.2,.65],home_battery:[.6,.25,1.1],wallbox:[.3,.15,.42],meter:[.55,.21,1.1],grid_point:[.4,.22,.6],fridge:[.6,.65,1.8],fridge_smart:[.91,.73,1.78],stairwell:[1,2.6,.02],stove:[.6,.62,.92],sink:[.9,.62,.92],bathtub:[1.7,.75,.58],shower:[.9,.9,2],wc:[.38,.6,.8],washbasin:[.6,.46,.85],desk:[1.4,.7,.75],tv_board:[1.8,.42,.5],plant:[.45,.45,1.1],rug:[2,1.4,.01],stairs:[1,3.2,2.75],stool:[.55,.55,.42],lamp_ceiling:[.4,.4,.08],lamp_downlight:[.1,.1,.02],lamp_spot:[.1,.1,.14],lamp_panel:[.6,.6,.03],lamp_uplight:[.35,.35,1.8],lamp_bollard:[.16,.16,.8],lamp_garden:[.12,.12,.3],radiator:[1,.1,.6],robot_vacuum:[.36,.5,.1],parking:[2.6,5.2,.02],lamp_pendant:[.4,.4,.8],lamp_floor:[.4,.4,1.7],lamp_table:[.28,.28,.45],lamp_wall:[.22,.12,.2],led_strip:[2,.04,.03],coffee_table:[1.1,.6,.42],tv_wall:[1.3,.08,.75],sideboard:[1.6,.45,.8],table_round:[1.1,1.1,.75],bench:[1.4,.45,.85],corner_bench:[2,1.6,.9],bar_stool:[.42,.42,.75],kitchen_wall:[.8,.35,.7],kitchen_tall:[.6,.62,2.1],island:[1.8,.9,.92],dishwasher:[.6,.62,.92],bunk_bed:[1,2.05,1.65],dresser:[1,.5,.9],washer:[.6,.6,.85],dryer:[.6,.6,.85],office_chair:[.65,.65,1.1],tall_cabinet:[.6,.6,2.1],coat_rack:[1,.35,1.9]};var pn=["interior","front","front_glass","sidelight","sidelights","glass","sliding","passage"],fn=["standard","bars"];function mn(o,e){return o.type==="door"?o.style&&pn.includes(o.style)?o.style:e?"front":"interior":o.style&&fn.includes(o.style)?o.style:"standard"}function gn(o){return o==="front"||o==="front_glass"||o==="sidelight"||o==="sidelights"}var kt={door:{type:"door",leaves:1,width:.9,sill:0,height:2.05,style:"interior"},front:{type:"door",leaves:1,width:1,sill:0,height:2.1,style:"front"},door_double:{type:"door",leaves:2,width:1.6,sill:0,height:2.05},window:{type:"window",leaves:1,width:1.2,sill:.9,height:1.3},window_double:{type:"window",leaves:2,width:1.6,sill:.9,height:1.3},terrace:{type:"window",leaves:1,width:1,sill:0,height:2.1},terrace_double:{type:"window",leaves:2,width:1.8,sill:0,height:2.1},garage:{type:"garage",leaves:1,width:2.5,sill:0,height:2.1}};function _n(o){if(o.type==="garage")return"garage";let e=o.leaves===2;return o.type==="door"?!e&&o.style&&gn(o.style)?"front":e?"door_double":"door":o.sill<.1?e?"terrace_double":"terrace":e?"window_double":"window"}function $t(o){o.energy={...Pr,...o.energy??{}},o.presence=o.presence??[],o.settings={...Tr,...o.settings,roof:{...Gi,...o.settings?.roof??{}}};for(let e of o.floors){e.outdoor=e.outdoor??[],e.walls=e.walls??[],e.rooms=e.rooms.map(n=>({...n,panel:n.panel??[]})),e.ha_floor=e.ha_floor??null,e.placements=e.placements.map(n=>({...n,mount:n.mount??null,rotation:n.rotation??0})),e.furniture=e.furniture.map(n=>({...n,entity:n.entity??null,power:n.power??null}));let t=e.placements.filter(n=>n.entity_id.startsWith("light."));if(t.length){let n={ceiling:"lamp_ceiling",floor:"lamp_floor",table:"lamp_table",wall:"lamp_wall"};for(let i of t){let s=n[i.mount??"ceiling"],[r,a,l]=ae[s];e.furniture.push({id:`lamp_${i.entity_id.slice(6).replace(/[^A-Za-z0-9_\-.]/g,"_")}`.slice(0,64),type:s,x:i.x,z:i.z,rotation:0,w:r,d:a,h:l,variant:null,entity:i.entity_id,power:null})}e.placements=e.placements.filter(i=>!i.entity_id.startsWith("light."))}e.openings=e.openings.map(n=>({...n,hinge:n.hinge??"left",leaves:n.leaves??1,swing:n.swing??"in",style:n.style??null,cover:n.cover??null,contact:n.contact??null,contact2:n.contact2??null,tilt:n.tilt??null}))}return o}function H(o){return`${o}_${Math.random().toString(36).slice(2,10)}`}function Q(o){let e=0;for(let t=0;t<o.length;t++){let[n,i]=o[t],[s,r]=o[(t+1)%o.length];e+=n*r-s*i}return e/2}function Te(o){return Math.abs(Q(o))}function le(o){let e=Q(o);if(Math.abs(e)<1e-9){let i=o.length||1;return[o.reduce((s,r)=>s+r[0],0)/i,o.reduce((s,r)=>s+r[1],0)/i]}let t=0,n=0;for(let i=0;i<o.length;i++){let[s,r]=o[i],[a,l]=o[(i+1)%o.length],c=s*l-a*r;t+=(s+a)*c,n+=(r+l)*c}return[t/(6*e),n/(6*e)]}function xt(o){if(o.length!==4)return!1;for(let e=0;e<4;e++){let[t,n]=o[e],[i,s]=o[(e+1)%4];if(Math.abs(t-i)>1e-6&&Math.abs(n-s)>1e-6)return!1}return!0}function ie(o){let e=1/0,t=1/0,n=-1/0,i=-1/0;for(let[s,r]of o)e=Math.min(e,s),t=Math.min(t,r),n=Math.max(n,s),i=Math.max(i,r);return{x0:e,z0:t,x1:n,z1:i}}function bn(o){let e=o.rotation*Math.PI/180,t=Math.cos(e),n=Math.sin(e),i=o.w/2,s=o.d/2;return[[-i,-s],[i,-s],[i,s],[-i,s]].map(([r,a])=>[o.x+r*t-a*n,o.z+r*n+a*t])}function D(o,e){let t=!1;for(let n=0,i=e.length-1;n<e.length;i=n++){let[s,r]=e[n],[a,l]=e[i];r>o[1]!=l>o[1]&&o[0]<(a-s)*(o[1]-r)/(l-r)+s&&(t=!t)}return t}var Qi={lamp_ceiling:"ceiling",lamp_downlight:"downlight",lamp_spot:"spot",lamp_panel:"panel",lamp_uplight:"uplight",lamp_bollard:"bollard",lamp_garden:"garden",lamp_pendant:"pendant",lamp_floor:"floor",lamp_table:"table",lamp_wall:"wall",led_strip:"strip"};var es="neonplan3d";function Wr(o){let e=structuredClone(o);e.energy={...e.energy,grid:null,solar:null,battery:null,battery_soc:null,tariff:null},e.presence=[];for(let t of e.floors)t.placements=[],t.background=null,t.rooms=t.rooms.map(n=>({...n,area_id:null})),t.furniture=t.furniture.map(n=>({...n,entity:null,power:null})),t.openings=t.openings.map(n=>({...n,cover:null,contact:null,tilt:null}));return e}function ts(o,e){return{format:es,version:1,exported_at:new Date().toISOString(),building:e?Wr(o):structuredClone(o)}}function ns(o){let e;try{e=JSON.parse(o)}catch{throw new Error("not_json")}let t=e,n=t?.format===es?t.building:e;if(!n||n.version!==1||!Array.isArray(n.floors)||!n.settings)throw new Error("not_plan");for(let i of n.floors)i.background=null;return $t(n)}function is(o){let e=new Set;for(let t of o.floors){t.background?.image_id&&e.add(t.background.image_id);for(let n of t.furniture)for(let i of n.pictures??[])i.image&&!/^https?:\/\//.test(i.image)&&!i.image.startsWith("camera:")&&e.add(i.image)}return[...e]}function vn(o,e){let t=URL.createObjectURL(new Blob([e],{type:"application/json"})),n=document.createElement("a");n.href=t,n.download=o,n.click(),setTimeout(()=>URL.revokeObjectURL(t),1e3)}var Lr={light:"light",switch:"switch",input_boolean:"switch",fan:"fan",cover:"cover",climate:"climate",media_player:"media",lock:"lock",sensor:"sensor",binary_sensor:"binary",camera:"camera",scene:"scene",script:"script"},Hr=new Set(["temperature","humidity","power","carbon_dioxide","energy","gas","water","volume","volume_storage","volume_flow_rate","illuminance","pressure","atmospheric_pressure","pm1","pm25","pm10","volatile_organic_compounds","volatile_organic_compounds_parts","carbon_monoxide","nitrogen_dioxide","moisture","sound_pressure"]),Vr=new Set(["m\xB3","m3","L","l","kWh","Wh","MWh","lx"]),Br=new Set(["door","window","opening","garage_door","motion","occupancy","presence","smoke","moisture","gas","carbon_monoxide"]),St=["light","cover","climate","media","switch","fan","lock","binary","sensor","camera","scene","script"],ls=new Set(["light","switch","fan"]);function cs(o){return o.slice(0,o.indexOf("."))}function V(o){return Lr[cs(o)]??null}function et(o){return o!==null&&o!=="scene"&&o!=="script"}function Mt(o,e){let t=o.entities?.[e];return t?t.area_id?t.area_id:t.device_id&&o.devices?.[t.device_id]?.area_id||null:null}function ss(o,e){let t=V(e);if(!t)return!1;let n=o.entities?.[e];if(n?.hidden||n?.entity_category)return!1;let i=o.states[e];if(!i)return!1;let s=i.attributes.device_class;return t==="sensor"?s?Hr.has(s):Vr.has(String(i.attributes.unit_of_measurement??"")):t==="binary"?!!s&&Br.has(s):!0}var Cr=new Set(["battery","signal_strength","timestamp","date","duration","data_rate","data_size","frequency","enum"]);function rs(o,e){if(V(e)!=="sensor")return!1;let t=o.entities?.[e];if(t?.hidden||t?.entity_category)return!1;let n=o.states[e];return!n||!n.attributes.unit_of_measurement||Cr.has(String(n.attributes.device_class??""))?!1:Number.isFinite(Number(n.state))||fs(n)}var yn=null;function tt(o){let e=yn;if(e&&e.entities===o.entities&&e.devices===o.devices&&(e.states===o.states||(e.states=o.states,Object.keys(o.states).length===e.stateCount)))return e;let t=new Map,n=new Map,i=[],s=new Map;for(let r of Object.keys(o.entities??{})){let a=o.entities[r],l=a.device_id;l&&Mn(o,r)&&(n.get(l)??n.set(l,[]).get(l)).push(r),l&&!a.hidden&&!a.entity_category&&(s.get(l)??s.set(l,new Set).get(l)).add(cs(r));let c=ss(o,r),d=Mt(o,r);if(!d){(c||rs(o,r))&&et(V(r))&&i.push(r);continue}c&&(t.get(d)??t.set(d,[]).get(d)).push(r)}if(o.entities)for(let r of Object.keys(o.states))o.entities[r]||(ss(o,r)||rs(o,r))&&et(V(r))&&i.push(r);i.sort((r,a)=>St.indexOf(V(r))-St.indexOf(V(a))||Z(o,r).localeCompare(Z(o,a)));for(let[r,a]of t){let l=o.areas?.[r]?.name;a.sort((c,d)=>{let h=St.indexOf(V(c)),p=St.indexOf(V(d));return h-p||Z(o,c,l).localeCompare(Z(o,d,l))})}return yn={entities:o.entities,devices:o.devices,states:o.states,stateCount:Object.keys(o.states).length,areas:t,power:n,unassigned:i,domains:s},yn}function Se(o,e){return!e||!o.entities?[]:tt(o).areas.get(e)??[]}function ds(o,e){return o.entities?[...tt(o).areas].filter(([t])=>t!==e).map(([t,n])=>({areaId:t,name:o.areas?.[t]?.name??t,ids:n.filter(i=>et(V(i)))})).filter(t=>t.ids.length).sort((t,n)=>t.name.localeCompare(n.name)):[]}function hs(o){return o.entities?tt(o).unassigned:[]}var wn={temperature:"temperature",humidity:"humidity",co2:"carbon_dioxide"},Nr=new Set(["climate","water_heater","switch","button","camera","media_player","vacuum","light","fan","lawn_mower"]),Kr=/(vorlauf|r(ü|ue)cklauf|flow|return|d(ü|ue)se|nozzle|hotend|extruder|druckbett|heatbed|(^|[^a-z])bed($|[^a-z])|chamber|cpu|gpu|chip|soc|akku|batter|wasser|water|kessel|boiler|au(ß|ss)en|outdoor|outside|abgas|exhaust|sole|brine|verdampfer|kondensat|verdichter|compressor|motor|k(ü|ue)hl|freezer|fridge|gefrier)/i;function kn(o,e){let t=o.entities?.[e]?.device_id,n=t?tt(o).domains.get(t):void 0;return n&&[...n].some(i=>Nr.has(i))?!1:!Kr.test(`${e} ${o.states[e]?.attributes.friendly_name??""}`)}function us(o,e,t,n){let i=t.climate?.[n];if(i==="none")return[];if(i)return o.states[i]?[i]:[];let s=wn[n],r=(h,p)=>D([h,p],t.points),a=e?.placements.filter(h=>h.entity_id.startsWith("sensor."))??[],l=a.filter(h=>r(h.x,h.z)).map(h=>h.entity_id),c=new Set(a.filter(h=>!r(h.x,h.z)).map(h=>h.entity_id));return[...new Set([...Se(o,t.area_id).filter(h=>!c.has(h)),...l])].filter(h=>h.startsWith("sensor.")&&o.states[h]?.attributes.device_class===s&&kn(o,h))}function ps(o,e){return o.entities?tt(o).power.get(e)??[]:[]}function Z(o,e,t){let i=o.states[e]?.attributes.friendly_name??o.entities?.[e]?.name??e;if(t&&i.length>t.length+1&&i.toLowerCase().startsWith(t.toLowerCase()+" ")){let s=i.slice(t.length+1);return s.charAt(0).toUpperCase()+s.slice(1)}return i}function fs(o){return!o||o.state==="unavailable"||o.state==="unknown"}function ms(o){return!!o&&o.entity_id.startsWith("sensor.")&&o.attributes.device_class==="enum"}function $n(o,e,t=null){if(o==="camera")return t==="ceiling"?Math.max(.5,e-.05):2.2;if(o==="light"&&t){if(t==="floor")return 1.95;if(t==="table")return 1.25;if(t==="wall")return 1.95}switch(o){case"light":return Math.max(.5,e-.25);case"cover":return Math.min(2,e-.3);case"climate":return .6;case"media":return .9;case"binary":case"sensor":return 1.4;default:return 1.05}}function Gr(o,e){let t=1/0;for(let n=0;n<e.length;n++){let i=e[n],s=e[(n+1)%e.length],r=s[0]-i[0],a=s[1]-i[1],l=r*r+a*a||1,c=Math.min(1,Math.max(0,((o[0]-i[0])*r+(o[1]-i[1])*a)/l));t=Math.min(t,Math.hypot(o[0]-i[0]-r*c,o[1]-i[1]-a*c))}return t}function gs(o,e,t=[]){if(o.points.length<3||!e.length)return[];let n=o.points,i=n.map(m=>m[0]),s=n.map(m=>m[1]),r=Math.min(...i),a=Math.min(...s),l=Math.max(...i),c=Math.max(...s),d=Math.min(l-r,c-a),h=Math.max(.1,Math.min(.25,d/8)),p=Math.min(.35,d/5),g=le(n),f=[];for(let m=r+h/2;m<l;m+=h)for(let _=a+h/2;_<c;_+=h){let k=[m,_];if(!D(k,n))continue;let $=Gr(k,n);$<p||f.push({p:k,wall:$})}f.length||f.push({p:g,wall:0});let u=[...t],y=[],b=Math.min(.7,d/4);for(let m of e){let _=V(m)==="light",k=f[0].p,$=-1/0;for(let{p:z,wall:A}of f){let I=u.length?Math.min(...u.map(R=>Math.hypot(z[0]-R[0],z[1]-R[1]))):3,x=Math.hypot(z[0]-g[0],z[1]-g[1]),E=Math.min(I,3)*2;x<b&&!_&&(E-=10),E-=_?x*.35:A*1.2,E>$+1e-9&&($=E,k=z)}let S=[Math.round(k[0]*100)/100,Math.round(k[1]*100)/100];u.push(S),y.push({entity_id:m,x:S[0],z:S[1],y:null,mount:null})}return y}var jr=new Set([void 0,"shutter","blind","awning","shade","curtain","window"]),Ur=new Set(["garage","gate"]),qr=new Set(["window","opening"]);function Qe(o,e,t=!1){let n=new Map;return e.length&&o.forEach((i,s)=>{let r=t&&e.length===1?e[0]:e[s];r&&n.set(i.id,r)}),n}function _s(o,e){let t=new Map;for(let n of e)for(let i of n.rooms){let s=n.openings.filter(m=>m.room_id===i.id).sort((m,_)=>m.edge-_.edge||m.offset-_.offset);if(!s.length)continue;let r=Se(o,i.area_id),a=m=>o.states[m]?.attributes.device_class,l=r.filter(m=>V(m)==="cover"&&jr.has(a(m))),c=s.filter(m=>m.type==="window"),d=s.filter(m=>m.type==="door"),h=s.filter(m=>m.type==="garage"),p=Qe(c,l,!0),g=Qe(c,r.filter(m=>V(m)==="binary"&&qr.has(a(m)))),f=Qe(d,r.filter(m=>V(m)==="binary"&&a(m)==="door")),u=Qe(h,r.filter(m=>V(m)==="cover"&&Ur.has(a(m)??""))),y=Qe(h,r.filter(m=>V(m)==="binary"&&a(m)==="garage_door")),b=(m,_)=>m==="none"?null:m??_??null;for(let m of s){let _=m.type==="window"?p:m.type==="garage"?u:null,k=m.type==="window"?g:m.type==="garage"?y:f;t.set(m.id,{cover:b(m.cover,_?.get(m.id)),contact:m.sensor==="handle"&&m.contact==null?null:b(m.contact,k.get(m.id)),tilt:m.tilt==="none"?null:m.tilt,contact2:m.leaves===2&&m.contact2&&m.contact2!=="none"?m.contact2:null,tilt2:m.leaves===2&&m.tilt2&&m.tilt2!=="none"?m.tilt2:null,position:m.position&&m.position!=="none"?m.position:null,positionInverted:!!m.position_inverted})}}return t}var Xr=[[/^(tilted|tilt|gekippt|kipp)/i,"tilted"],[/^(open|opened|offen|geöffnet|on)$/i,"open"],[/^(closed|close|geschlossen|zu|off)$/i,"closed"]];function xn(o){if(!o||fs(o))return null;let e=o.attributes.window_state;for(let t of[typeof e=="string"?e:null,o.state]){if(!t)continue;let n=Xr.find(([i])=>i.test(t.trim()));if(n)return n[1]}return null}function Sn(o,e){let t=new Map,n=[];for(let r of e){let a=o.entities?.[r]?.device_id??`entity:${r}`,l=t.get(a);l||(t.set(a,l=[]),n.push(a)),l.push(r)}let i=n.map(r=>{let a=t.get(r),l=a.find(c=>!o.entities?.[c]?.name)??a[0];return{primary:l,others:a.filter(c=>c!==l)}}),s=new Map(e.map((r,a)=>[r,a]));return i.sort((r,a)=>s.get(r.primary)-s.get(a.primary))}function Zr(o,e){return Sn(o,e).map(t=>t.primary)}var Yr={robot_vacuum:/(saug|vacuum|robo|roomba|roborock|dreame|ecovacs|deebot)/i,tv_board:/\b(tv|fernseh|television|fire ?tv|apple ?tv|chromecast|shield)/i,tv_wall:/\b(tv|fernseh|television|fire ?tv|apple ?tv|chromecast|shield)/i,desk:/\b(pc|computer|rechner|desktop|monitor|workstation)/i,fridge:/(kühl|fridge|gefrier|freezer)/i,fridge_smart:/(kühl|fridge|gefrier|freezer)/i,stove:/(herd|kochfeld|cooktop|stove|induktion)/i,kitchen_tall:/(backofen|oven|ofen)/i,dishwasher:/(spülmaschine|geschirrspül|dishwasher)/i,washer:/(waschmaschine|washer|washing)/i,dryer:/(trockner|dryer)/i,kitchen:/(kaffee|coffee|wasserkocher|kettle)/i,island:/(kochfeld|herd|induktion|cooktop)/i,sink:/(spülmaschine|geschirrspül|dishwasher)/i,radiator:/(heiz|radiator|thermostat|climate|hk|trv)/i},Jr=new Set(["tv_board","tv_wall"]);function bs(o,e){let t=o.states[e.entity];if(!t)return!1;let n=e.attribute?t.attributes[e.attribute]:t.state;if(n==null)return!1;let i=String(n).toLowerCase(),s=e.state.trim().toLowerCase();return e.state.trim()==="*"||i===s||s.length>=3&&i.includes(s)}function zt(o){return Jr.has(o)||!!Ti(o)}function vs(o){return zt(o)||o==="desk"||o==="fridge_smart"}var os={lamp_ceiling:/(decke|ceiling|haupt|main)/i,lamp_downlight:/(spot|strahler|downlight|einbau)/i,lamp_spot:/(spot|strahler)/i,lamp_panel:/(panel|decke|ceiling)/i,lamp_uplight:/(fluter|uplight|steh)/i,lamp_bollard:/(weg|garten|garden|path|poller|außen|aussen|outdoor)/i,lamp_garden:/(garten|garden|spot|außen|aussen|outdoor|baum|tree)/i,lamp_pendant:/(pendel|pendant|hänge|esstisch|dining)/i,lamp_floor:/(steh|floor)/i,lamp_table:/(tisch|nacht|table|bedside|lese|reading)/i,lamp_wall:/(wand|wall)/i,led_strip:/(led|strip|streifen|leiste|band)/i};function Mn(o,e){return e.startsWith("sensor.")&&o.states[e]?.attributes.device_class==="power"}function Qr(o,e){if(Mn(o,e))return e;let t=o.entities?.[e]?.device_id;return t?ps(o,t).find(n=>n!==e)??null:null}function zn(o,e){let t=new Map;for(let n of e){let i=new Set(n.furniture.flatMap(s=>[s.entity,s.power]).filter(s=>!!s&&s!=="none"));for(let s of n.furniture){let r=s.type in os,a=r?os[s.type]:Yr[s.type];if(!a&&s.entity==null&&s.power==null)continue;let l=n.rooms.find(g=>g.points.length>=3&&D([s.x,s.z],g.points)),c=l?Zr(o,Se(o,l.area_id)):[],d=g=>`${g} ${Z(o,g)}`,h=s.entity==="none"?null:s.entity??null;if(s.entity==null){let g=c.filter(f=>!i.has(f));if(r){let f=g.filter(u=>V(u)==="light");h=f.find(u=>a.test(d(u)))??f[0]??null}else if(s.type==="robot_vacuum"){let f=l?.area_id??null;h=Object.keys(o.entities??{}).find(u=>u.startsWith("vacuum.")&&!i.has(u)&&Mt(o,u)===f)??null}else if(s.type==="radiator"){let f=g.filter(u=>V(u)==="climate");h=f.find(u=>a.test(d(u)))??f[0]??null}else if(zt(s.type)){let f=g.filter(u=>V(u)==="media");h=f.find(u=>o.states[u]?.attributes.device_class==="tv")??f.find(u=>a?.test(d(u)))??f[0]??null}else a&&(h=g.find(f=>["switch","media","fan"].includes(V(f)??"")&&a.test(d(f)))??null);h&&i.add(h)}let p=s.power==="none"?null:s.power??null;s.power==null&&(p=h?Qr(o,h):null,!p&&a&&l&&!r&&(p=Se(o,l.area_id).find(f=>Mn(o,f)&&!i.has(f)&&a.test(d(f)))??null),p&&i.add(p)),(h||p)&&t.set(s.id,{entity:h,power:p})}}return t}var as=/(^|_)(current_room|current_segment|aktueller_raum|current_area)($|_)/;function ys(o,e,t){if(t==="none")return null;if(t)return t;let n=e?o.entities?.[e]?.device_id:null;if(!n||!o.entities)return null;for(let i of Object.values(o.entities))if(!(i.device_id!==n||!i.entity_id.startsWith("sensor."))&&(as.test(i.translation_key??"")||as.test(i.entity_id.split(".")[1])))return i.entity_id;return null}var j=(o,e,t,n,i="")=>F`<rect class=${i} x=${Math.min(o,t)} y=${Math.min(e,n)} width=${Math.abs(t-o)} height=${Math.abs(n-e)} />`,G=(o,e,t,n,i="")=>F`<line class=${i} x1=${o} y1=${e} x2=${t} y2=${n} />`,X=(o,e,t,n="")=>F`<circle class=${n} cx=${o} cy=${e} r=${t} />`,En=(o,e,t,n,i="")=>F`<ellipse class=${i} cx=${o} cy=${e} rx=${t} ry=${n} />`;function Fn(o,e,t){let n=[];for(let i=1;i<t;i++){let s=-o/2+o/t*i;n.push(G(s,e/2,s,e/2-Math.min(.12,e*.3)))}return n}function ws(o,e,t,n){let i=Math.min(.24,e*.28),s=n?Math.min(.2,o*.12):0,r=[j(-o/2,-e/2,o/2,-e/2+i,"fp3d-sym-fill")];n&&r.push(j(-o/2,-e/2,-o/2+s,e/2,"fp3d-sym-fill"),j(o/2-s,-e/2,o/2,e/2,"fp3d-sym-fill"));let a=o-2*s;for(let l=1;l<t;l++){let c=-o/2+s+a/t*l;r.push(G(c,-e/2+i,c,e/2-.02))}return r}function ks(o,e,t){switch(o){case"sofa":return ws(e,t,Math.max(1,Math.round((e-.4)/.62)),!0);case"armchair":return ws(e,t,1,!0);case"bench":return[j(-e/2,-t/2,e/2,-t/2+.08,"fp3d-sym-fill")];case"corner_bench":{let n=Math.min(.5,t*.4);return[j(-e/2,-t/2,e/2,-t/2+.08,"fp3d-sym-fill"),j(-e/2,-t/2,-e/2+.08,t/2,"fp3d-sym-fill"),G(-e/2+n,-t/2+n,e/2,-t/2+n),G(-e/2+n,-t/2+n,-e/2+n,t/2)]}case"chair":return[j(-e/2,-t/2,e/2,-t/2+.06,"fp3d-sym-fill")];case"office_chair":return[X(0,.03,Math.min(e,t)*.36),j(-e*.35,-t/2+.02,e*.35,-t/2+.1,"fp3d-sym-fill")];case"bar_stool":case"table_round":return[X(0,0,Math.min(e,t)*.42)];case"stool":return[j(-e/2+.04,-t/2+.04,e/2-.04,t/2-.04)];case"table":case"coffee_table":case"desk":{let n=[j(-e/2+.05,-t/2+.05,e/2-.05,t/2-.05)];return o==="desk"&&n.push(G(-.3,-t/2+.1,.3,-t/2+.1,"fp3d-sym-strong")),n}case"bed":case"bunk_bed":{let n=e>1.2?2:1,i=(e-.2)/n,s=[j(-e/2,-t/2,e/2,-t/2+.07,"fp3d-sym-fill"),G(-e/2,-t/2+(t-.1)*.36,e/2,-t/2+(t-.1)*.36)];for(let r=0;r<n;r++)s.push(j(-e/2+.13+i*r,-t/2+.12,-e/2+.07+i*(r+1),-t/2+.12+Math.min(.4,t*.18)));return s}case"nightstand":case"wardrobe":case"dresser":case"sideboard":case"tall_cabinet":case"kitchen":case"kitchen_wall":case"kitchen_tall":case"shelf":return Fn(e,t,o==="nightstand"||o==="tall_cabinet"||o==="kitchen_tall"?1:Math.max(2,Math.round(e/.5)));case"coat_rack":return[j(-e/2,-t/2,e/2,-t/2+.03,"fp3d-sym-fill"),...Fn(e,t,Math.max(2,Math.round(e/.5)))];case"island":return[G(-e/2,t/2-.3,e/2,t/2-.3)];case"fridge":return[G(-e/2+.06,t/2-.04,e/2-.06,t/2-.04,"fp3d-sym-strong")];case"stove":{let n=Math.min(e,t)*.14;return[X(-e*.22,-t*.2,n),X(e*.22,-t*.2,n*.8),X(-e*.22,t*.2,n*.8),X(e*.22,t*.2,n)]}case"sink":{let n=Math.min(.5,e-.2);return[j(-n/2,-t/2+.1,n/2,t/2-.08),X(0,-t/2+.06,.025,"fp3d-sym-fill")]}case"dishwasher":return[G(-e/2+.08,t/2-.05,e/2-.08,t/2-.05,"fp3d-sym-strong")];case"washer":case"dryer":return[X(0,.05,Math.min(e,t)*.3),G(-e/2,-t/2+.1,e/2,-t/2+.1)];case"bathtub":return[j(-e/2+.07,-t/2+.07,e/2-.07,t/2-.07),X(-e/2+.14,0,.03,"fp3d-sym-fill")];case"shower":return[G(-e/2,-t/2,e/2,t/2),G(e/2,-t/2,-e/2,t/2),X(0,0,.04)];case"wc":return[j(-e/2,-t/2,e/2,-t/2+Math.min(.18,t*.3),"fp3d-sym-fill"),En(0,t*.1,e*.36,t*.3)];case"washbasin":return[En(0,.03,e*.34,t*.3)];case"tv_board":return[G(-Math.min(e*.4,.72),-t/2+.14,Math.min(e*.4,.72),-t/2+.14,"fp3d-sym-strong"),...Fn(e,t,Math.max(2,Math.round(e/.6)))];case"tv_wall":return[G(-e/2,0,e/2,0,"fp3d-sym-strong")];case"lamp_downlight":case"lamp_spot":return[X(0,0,Math.min(e,t)*.45,"fp3d-sym-fill"),X(0,0,Math.min(e,t)*1.4)];case"lamp_bollard":case"lamp_garden":return[X(0,0,Math.min(e,t)*.5,"fp3d-sym-fill"),X(0,0,Math.min(e,t)*1.6)];case"parking":return[j(-e/2+.08,-t/2+.08,e/2-.08,t/2-.08),G(-e*.15,t/2-.5,0,t/2-.22,"fp3d-sym-strong"),G(0,t/2-.22,e*.15,t/2-.5,"fp3d-sym-strong")];case"robot_vacuum":return[j(-e*.45,-t/2,e*.45,-t/2+t*.3,"fp3d-sym-fill"),X(0,t*.14,Math.min(e,t)*.47)];case"radiator":{let n=[],i=Math.max(3,Math.round(e/.1));for(let s=1;s<i;s++)n.push(G(-e/2+e/i*s,-t/2,-e/2+e/i*s,t/2));return n}case"lamp_panel":return[j(-e/2+.03,-t/2+.03,e/2-.03,t/2-.03,"fp3d-sym-fill")];case"lamp_uplight":case"lamp_ceiling":case"lamp_pendant":case"lamp_floor":case"lamp_table":{let n=Math.min(e,t)/2,i=[X(0,0,n*.9,"fp3d-sym-fill"),X(0,0,n*.3)];if(o==="lamp_ceiling"||o==="lamp_pendant")for(let s=0;s<8;s++){let r=s/8*Math.PI*2;i.push(G(Math.cos(r)*n*1.05,Math.sin(r)*n*1.05,Math.cos(r)*n*1.35,Math.sin(r)*n*1.35))}return i}case"lamp_wall":return[j(-e/2,-t/2,e/2,-t/2+.03,"fp3d-sym-fill"),En(0,.01,e*.4,t*.4)];case"led_strip":return[G(-e/2,0,e/2,0,"fp3d-sym-strong")];case"plant":return[X(0,0,Math.min(e,t)*.46),X(0,0,Math.min(e,t)*.25)];case"rug":return[j(-e/2+.1,-t/2+.1,e/2-.1,t/2-.1)];case"stairs":{let n=Math.max(3,Math.round(t/.26)),i=[];for(let s=1;s<n;s++)i.push(G(-e/2,t/2-t/n*s,e/2,t/2-t/n*s));return i.push(G(0,t/2-.1,0,-t/2+.25,"fp3d-sym-strong"),G(-.15,-t/2+.45,0,-t/2+.25,"fp3d-sym-strong"),G(.15,-t/2+.45,0,-t/2+.25,"fp3d-sym-strong")),i}default:{let n=ee(o);return n?eo(n,e,t):w}}}function eo(o,e,t){return o.symbol?.length?o.symbol.map(n=>n.shape==="rect"?j((n.x-n.w/2)*e,(n.z-n.d/2)*t,(n.x+n.w/2)*e,(n.z+n.d/2)*t,n.fill?"fp3d-sym-fill":""):n.shape==="circle"?X(n.x*e,n.z*t,n.r*Math.min(e,t)):G(n.x1*e,n.z1*t,n.x2*e,n.z2*t)):o.parts.filter(n=>n.w<.98||n.d<.98).map(n=>n.shape==="cyl"&&(n.axis??"y")==="y"?X(n.x*e,n.z*t,Math.min(n.w*e,n.d*t)/2):j((n.x-n.w/2)*e,(n.z-n.d/2)*t,(n.x+n.w/2)*e,(n.z+n.d/2)*t))}var to=.05,no=.2,io=.12;function so(o){let e=[];return o.forEach((t,n)=>{let i=t.points;if(i.length<3)return;let s=Q(i)>=0;for(let r=0;r<i.length;r++){let a=i[r],l=i[(r+1)%i.length],c=l[0]-a[0],d=l[1]-a[1],h=Math.hypot(c,d);if(h<.05)continue;let p=[c/h,d/h],g=s?[p[1],-p[0]]:[-p[1],p[0]];(p[1]<-1e-9||Math.abs(p[1])<=1e-9&&p[0]<0)&&(p=[-p[0],-p[1]]);let f=[-p[1],p[0]],u=a[0]*p[0]+a[1]*p[1],y=l[0]*p[0]+l[1]*p[1];e.push({room:n,index:r,dir:p,normal:f,offset:a[0]*f[0]+a[1]*f[1],outside:g[0]*f[0]+g[1]*f[1]>0?1:-1,t0:Math.min(u,y),t1:Math.max(u,y)})}}),e}function $s(o,e=.6){let t=so(o),n=t.map((d,h)=>h),i=d=>n[d]===d?d:n[d]=i(n[d]),s=[];for(let d=0;d<t.length;d++)for(let h=d+1;h<t.length;h++){let p=t[d],g=t[h];if(p.room===g.room||Math.abs(p.dir[0]*g.dir[1]-p.dir[1]*g.dir[0])>to||p.outside===g.outside)continue;let f=(g.offset-p.offset)*p.outside;f>e||f<-io||Math.abs(f)<1e-4||Math.min(p.t1,g.t1)-Math.max(p.t0,g.t0)<no||(s.push(Math.round(f*1e3)/1e3),n[i(d)]=i(h))}if(!s.length)return{rooms:o.map(d=>({...d,points:d.points.map(h=>[h[0],h[1]])})),gaps:s};let r=new Map;t.forEach((d,h)=>{let p=i(h);if(p===h&&!t.some((f,u)=>u!==h&&i(u)===h))return;let g=r.get(p)??[];g.push(h),r.set(p,g)});let a=o.map(d=>d.points.map(()=>new Map));for(let[d,h]of r){let p=h.reduce((g,f)=>g+t[f].offset,0)/h.length;for(let g of h){let f=t[g],u=p-f.offset,y=[f.normal[0]*u,f.normal[1]*u],b=o[f.room].points.length;a[f.room][f.index].set(d,y),a[f.room][(f.index+1)%b].set(d,y)}}let l=d=>Math.round(d*1e3)/1e3;return{rooms:o.map((d,h)=>({...d,points:d.points.map((p,g)=>{let f=p[0],u=p[1];for(let[y,b]of a[h][g].values())f+=y,u+=b;return[l(f),l(u)]})})),gaps:s}}function xs(o){let e=o.filter(n=>n>.04).sort((n,i)=>n-i);if(!e.length)return null;let t=e[Math.floor(e.length/2)];return Math.min(.5,Math.max(.08,Math.round(t*100)/100))}var ro=.25,Ss=o=>Math.round(o*1e3)/1e3;function An(o,e,t,n,i){let s=o.rooms.find(r=>r.points.length>=3&&D([e,t],r.points));return!s||D([n,i],s.points)?[n,i]:D([n,t],s.points)?[n,t]:D([e,i],s.points)?[e,i]:[e,t]}function Et(o,e,t,n=ro){let i=o.rooms.find(c=>c.points.length>=3&&D([e.x,e.z],c.points));if(!i)return null;let s=i.points,r=Q(s)>=0?1:-1,a=t/2,l=null;for(let c=0;c<s.length;c++){let d=s[c],h=s[(c+1)%s.length],p=Math.hypot(h[0]-d[0],h[1]-d[1]);if(p<.3)continue;let g=[(h[0]-d[0])/p,(h[1]-d[1])/p],f=[-g[1]*r,g[0]*r],u=(e.x-d[0])*g[0]+(e.z-d[1])*g[1];if(u<0||u>p)continue;let b=o.rooms.some(A=>A.id!==i.id&&A.points.some((I,x)=>{let E=A.points[(x+1)%A.points.length],R=Math.abs((I[0]-d[0])*f[0]+(I[1]-d[1])*f[1]),T=Math.abs((E[0]-d[0])*f[0]+(E[1]-d[1])*f[1]);return R<.02&&T<.02}))?a:0,m=(e.x-d[0])*f[0]+(e.z-d[1])*f[1]-b,_=Math.atan2(-f[0],f[1])*180/Math.PI,k=A=>Math.abs((e.rotation-A+540)%360-180),S=[{rotation:_,extent:e.d/2},{rotation:_+90,extent:e.w/2},{rotation:_-90,extent:e.w/2}].reduce((A,I)=>k(I.rotation)<k(A.rotation)?I:A);if(k(S.rotation)>50)continue;let z=m-S.extent;Math.abs(z)>n||l&&Math.abs(z)>=Math.abs(l.gap)||(l={x:Ss(e.x-f[0]*z),z:Ss(e.z-f[1]*z),rotation:(Math.round(S.rotation)%360+360)%360,gap:z})}return l?{x:l.x,z:l.z,rotation:l.rotation}:null}function oo(o,e,t){let n=t[0]-e[0],i=t[1]-e[1],s=n*n+i*i,r=s?Math.max(0,Math.min(1,((o[0]-e[0])*n+(o[1]-e[1])*i)/s)):0;return Math.hypot(o[0]-e[0]-n*r,o[1]-e[1]-i*r)}function Ms(o,e,t=.03){return o.every(n=>D(n,e)||e.some((i,s)=>oo(n,i,e[(s+1)%e.length])<=t))}function zs(o,e){return e&&o.states[e]?e:Object.keys(o.states).filter(t=>t.startsWith("weather.")).sort()[0]??null}var In=["camera_cockpit","weather","screens","energy_pro"],ao=["fridge_smart"];var Es=o=>(o??navigator.language).toLowerCase().startsWith("de");function nt(o){return Es(o)?"https://mastershort.de/neonplan3d/?lang=de":"https://mastershort.de/en/neonplan3d/?lang=en"}var lo={camera_cockpit:{de:"pro-erweiterungen/#61-kamera-cockpit",en:"pro-add-ons/#61-camera-cockpit"},weather:{de:"pro-erweiterungen/#62-wetter-drau%C3%9Fen",en:"pro-add-ons/#62-weather-outside"},screens:{de:"pro-erweiterungen/#63-bildschirme-live",en:"pro-add-ons/#63-live-screens"},energy_pro:{de:"pro-erweiterungen/#64-energie-pro",en:"pro-add-ons/#64-energy-pro"},extensions:{de:"erweiterungen-shop-moebel-packs/",en:"extensions-shop-furniture-packs/"}};function it(o,e){let t=Es(o),n=t?"https://mastershort.de/neonplan3d/anleitung/":"https://mastershort.de/en/neonplan3d/manual/",i=e?lo[e]:void 0,s=i?t?i.de:i.en:"",[r,a]=s.split("#");return`${n}${r}?lang=${t?"de":"en"}${a?`#${a}`:""}`}function Rn(o=Pi()){let e=new Set;for(let t of o)for(let n of t.features??[])(In.includes(n)||ao.includes(n))&&e.add(n);return e}function st(o,e){return Rn(e).has(o)}var Y=(o,e)=>[o[0]-e[0],o[1]-e[1]],Me=(o,e)=>[o[0]+e[0],o[1]+e[1]],_e=(o,e)=>[o[0]*e,o[1]*e],ot=(o,e)=>o[0]*e[0]+o[1]*e[1],rt=(o,e)=>o[0]*e[1]-o[1]*e[0],Ft=o=>Math.hypot(o[0],o[1]),pe=o=>{let e=Ft(o)||1;return[o[0]/e,o[1]/e]},Fs=o=>[-o[1],o[0]],As=o=>[o[1],-o[0]];function fe(o,e,t=[]){let n=e.eps??.005,i=[],s=t.filter(b=>Math.hypot(b.b[0]-b.a[0],b.b[1]-b.a[1])>.05),r=[],a=b=>{for(let m=0;m<r.length;m++)if(Math.abs(r[m][0]-b[0])<=n&&Math.abs(r[m][1]-b[1])<=n)return m;return r.push([b[0],b[1]]),r.length-1},l=[];for(let b of o){let m=b.points;if(m.length<3||Math.abs(Q(m))<1e-6)continue;let _=Q(m)>0,k=m.map(a);for(let $=0;$<m.length;$++){let S=k[$],z=k[($+1)%m.length];S!==z&&l.push(_?{u:S,v:z,room:b.id,edge:$,forward:!0}:{u:z,v:S,room:b.id,edge:$,forward:!1})}}let c=s.map(b=>[a(b.a),a(b.b)]),d=[];for(let b of l){let m=r[b.u],_=r[b.v],k=Y(_,m),$=Ft(k),S=_e(k,1/$),z=[];for(let I=0;I<r.length;I++){if(I===b.u||I===b.v)continue;let x=Y(r[I],m),E=ot(x,S);E<=n||E>=$-n||Math.abs(rt(S,x))<=n&&z.push({t:E,id:I})}z.sort((I,x)=>I.t-x.t);let A=[{t:0,id:b.u},...z,{t:$,id:b.v}];for(let I=0;I+1<A.length;I++){let x=A[I],E=A[I+1],R=b.forward?x.t:$-E.t,T=b.forward?E.t:$-x.t;d.push({u:x.id,v:E.id,room:b.room,edge:b.edge,t0:R,t1:T})}}let h=new Map;for(let b of d){let m=b.u<b.v?`${b.u}-${b.v}`:`${b.v}-${b.u}`,_=h.get(m);_||h.set(m,_=[]),_.push(b)}let p=b=>({room_id:b.room,edge:b.edge,t0:b.t0,t1:b.t1}),g=b=>{let m=b.map(_=>o.find(k=>k.id===_.room)?.wall_heights?.[_.edge]).filter(_=>typeof _=="number"&&_>0);return m.length?Math.min(...m):void 0},f=[];for(let b of h.values()){let m=b[0],_=b.find(k=>k!==m&&k.u===m.v&&k.v===m.u&&k.room!==m.room);for(let k of b)k!==m&&k!==_&&k.room!==m.room&&i.push(`overlap:${m.room}:${k.room}`);_?f.push({a:m.u,b:m.v,left:e.interior/2,right:e.interior/2,exterior:!1,roomLeft:m.room,roomRight:_.room,sources:[p(m),p(_)],height:g([m,_])}):f.push({a:m.u,b:m.v,left:0,right:e.exterior,exterior:!0,roomLeft:m.room,roomRight:null,sources:[p(m)],height:g([m])})}s.forEach((b,m)=>{let[_,k]=c[m];if(_===k)return;let $=[(b.a[0]+b.b[0])/2,(b.a[1]+b.b[1])/2],S=o.find(I=>I.points.length>=3&&D($,I.points))?.id??null,z=(b.thickness??e.interior)/2,A=typeof b.height=="number"&&b.height>0?b.height:void 0;f.push({free:b.id,a:_,b:k,left:z,right:z,exterior:!1,roomLeft:S,roomRight:S,sources:[],height:A})}),f=ho(f,r);let u=po(f,r);return{walls:f.map((b,m)=>{let _=r[b.a],k=r[b.b],$=u.get(`${m}:a`),S=u.get(`${m}:b`),z=fo([$.right,S.left,k,S.right,$.left,_],1e-6);return{id:co(_,k),a:[_[0],_[1]],b:[k[0],k[1]],left:b.left,right:b.right,exterior:b.exterior,roomLeft:b.roomLeft,roomRight:b.roomRight,sources:b.sources,footprint:z,...b.free?{free:b.free}:{},...b.height!==void 0?{height:b.height}:{}}}),warnings:[...new Set(i)]}}function co(o,e){let t=s=>Math.round(s*100),[n,i]=o[0]<e[0]||o[0]===e[0]&&o[1]<=e[1]?[o,e]:[e,o];return`w_${t(n[0])}_${t(n[1])}_${t(i[0])}_${t(i[1])}`}function Is(o){return{...o,a:o.b,b:o.a,left:o.right,right:o.left,roomLeft:o.roomRight,roomRight:o.roomLeft}}function ho(o,e){let t=o.slice(),n=!0;for(;n;){n=!1;let i=new Map;t.forEach((s,r)=>{for(let a of[s.a,s.b]){let l=i.get(a);l||i.set(a,l=[]),l.push(r)}});for(let[s,r]of i){if(r.length!==2)continue;let a=t[r[0]],l=t[r[1]];if(a.b!==s&&(a=Is(a)),l.a!==s&&(l=Is(l)),a.a===l.b)continue;let c=pe(Y(e[a.b],e[a.a])),d=pe(Y(e[l.b],e[l.a]));if(Math.abs(rt(c,d))>1e-6||ot(c,d)<=0||a.free||l.free||a.height!==l.height||a.exterior!==l.exterior||a.roomLeft!==l.roomLeft||a.roomRight!==l.roomRight||Math.abs(a.left-l.left)>1e-9||Math.abs(a.right-l.right)>1e-9)continue;let h={...a,b:l.b,sources:uo(a.sources,l.sources)},p=t.filter((g,f)=>f!==r[0]&&f!==r[1]);p.push(h),t.length=0,t.push(...p),n=!0;break}}return t}function uo(o,e){let t=o.map(n=>({...n}));for(let n of e){let i=t.find(s=>s.room_id===n.room_id&&s.edge===n.edge&&(Math.abs(s.t1-n.t0)<1e-6||Math.abs(n.t1-s.t0)<1e-6));i?(i.t0=Math.min(i.t0,n.t0),i.t1=Math.max(i.t1,n.t1)):t.push({...n})}return t}function po(o,e){let t=new Map;o.forEach((i,s)=>{let r=pe(Y(e[i.b],e[i.a])),a=[[i.a,{key:`${s}:a`,d:r,left:i.left,right:i.right,angle:Math.atan2(r[1],r[0])}],[i.b,{key:`${s}:b`,d:_e(r,-1),left:i.right,right:i.left,angle:Math.atan2(-r[1],-r[0])}]];for(let[l,c]of a){let d=t.get(l);d||t.set(l,d=[]),d.push(c)}});let n=new Map;for(let[i,s]of t){let r=e[i];s.sort((c,d)=>c.angle-d.angle);let a=c=>({left:Me(r,_e(Fs(c.d),c.left)),right:Me(r,_e(As(c.d),c.right))});for(let c of s)n.set(c.key,a(c));if(s.length<2)continue;let l=4*Math.max(...s.map(c=>Math.max(c.left,c.right)))+1e-9;for(let c=0;c<s.length;c++){let d=s[c],h=s[(c+1)%s.length],p=Me(r,_e(Fs(d.d),d.left)),g=Me(r,_e(As(h.d),h.right)),f=rt(d.d,h.d);if(Math.abs(f)<1e-4)continue;let u=rt(Y(g,p),h.d)/f,y=Me(p,_e(d.d,u));Ft(Y(y,r))>l||(n.get(d.key).left=y,n.get(h.key).right=y)}}return n}function fo(o,e){let t=o.filter((i,s)=>Ft(Y(i,o[(s+1)%o.length]))>e),n=!0;for(;n&&t.length>3;){n=!1;for(let i=0;i<t.length;i++){let s=t[(i+t.length-1)%t.length],r=t[i],a=t[(i+1)%t.length],l=Y(r,s),c=Y(a,r);if(Math.abs(rt(pe(l),pe(c)))<1e-7&&ot(l,c)>0){t=t.filter((d,h)=>h!==i),n=!0;break}}}return t}function Oe(o,e,t){let n=o.points[e],i=o.points[(e+1)%o.points.length],s=pe(Y(i,n));return Me(n,_e(s,t))}function De(o,e,t){if(o.wall){let i=t.find(a=>a.id===o.wall);if(!i||Math.hypot(i.b[0]-i.a[0],i.b[1]-i.a[1])<.05)return null;let s=pe(Y(i.b,i.a));return{room:{id:o.room_id,name:"",area_id:null,points:[i.a,i.b,Me(i.a,[-s[1],s[0]])]},edge:0}}let n=e.find(i=>i.id===o.room_id);return n&&o.edge<n.points.length?{room:n,edge:o.edge}:null}function Pn(o,e,t){if(!e.wall)return mo(o,t.room,t.edge,e.offset);let n=o.find(s=>s.free===e.wall);if(!n)return null;let i=Oe(t.room,0,e.offset);return{wall:n,s:ot(Y(i,n.a),pe(Y(n.b,n.a)))}}function mo(o,e,t,n){for(let i of o){if(!i.sources.find(a=>a.room_id===e.id&&a.edge===t&&n>=a.t0-1e-6&&n<=a.t1+1e-6))continue;let r=Oe(e,t,n);return{wall:i,s:ot(Y(r,i.a),pe(Y(i.b,i.a)))}}return null}var Rs=Math.PI/180;function We(o){let e=Math.min(o.x0,o.x1),t=Math.max(o.x0,o.x1),n=Math.min(o.z0,o.z1),i=Math.max(o.z0,o.z1);return o.axis==="x"?{u0:e,u1:t,w:i-n,at:(s,r)=>[s,o.flip?i-r:n+r]}:{u0:n,u1:i,w:t-e,at:(s,r)=>[o.flip?t-r:e+r,s]}}function at(o){let e=We(o).w,t=o.eave_a,n=o.eave_b,i=Math.tan(Math.min(80,Math.max(0,o.pitch_a))*Rs),s=Math.tan(Math.min(80,Math.max(0,o.pitch_b))*Rs);if(o.shape==="flat")return{vr:e/2,rh:t,y:()=>t};if(o.shape==="pent")return{vr:e,rh:t+e*i,y:l=>t+l*i};let r=i+s>1e-6?Math.min(e,Math.max(0,(n-t+e*s)/(i+s))):e/2,a=t+r*i;return{vr:r,rh:a,y:l=>l<=r?t+l*i:n+(e-l)*s}}function Ps(o,e,t){let n=We(e),i=o.floors.flatMap(c=>c.rooms.filter(d=>d.points.length>=3&&c.elevation+c.height>e.base+.05)),s=c=>c.some(d=>i.some(h=>D(d,h.points))),r=.35,a=[.15,.5,.85].map(c=>n.u0+(n.u1-n.u0)*c),l=[.15,.5,.85].map(c=>n.w*c);return{a:s(a.map(c=>n.at(c,-r)))?0:t,b:s(a.map(c=>n.at(c,n.w+r)))?0:t,u0:s(l.map(c=>n.at(n.u0-r,c)))?0:t,u1:s(l.map(c=>n.at(n.u1+r,c)))?0:t}}function Ts(o,e,t,n,i){let s=[(e+n)/2,(t+i)/2],r=o.floors.filter(a=>a.rooms.some(l=>l.points.length>=3&&D(s,l.points))).map(a=>a.elevation+a.height);return r.length?Math.max(...r):null}function At(o){return at(o).rh}function Os(o,e=t=>`roof_${t+1}`){let t=o.settings.roof?.pitch??35,n=o.settings.wall_exterior,i=o.floors.filter(l=>l.rooms.some(c=>c.points.length>=3)).sort((l,c)=>c.elevation-l.elevation),s=[],r=[],a=l=>Math.round(l*1e3)/1e3;for(let l of i){let c=l.rooms.filter(_=>_.points.length>=3),d=[...new Set(c.flatMap(_=>_.points.map(k=>a(k[0]))))].sort((_,k)=>_-k),h=[...new Set(c.flatMap(_=>_.points.map(k=>a(k[1]))))].sort((_,k)=>_-k),p=d.length-1,g=h.length-1,f=(_,k)=>_.some($=>D(k,$.points)),u=[];for(let _=0;_<g;_++){u.push([]);for(let k=0;k<p;k++){let $=[(d[k]+d[k+1])/2,(h[_]+h[_+1])/2];u[_].push(f(c,$)&&!f(r,$))}}let y=u.map(_=>_.map(()=>!1)),b=(_,k)=>u[k][_]&&!y[k][_],m=l.elevation+l.height;for(let _=0;_<g;_++)for(let k=0;k<p;k++){if(!b(k,_))continue;let $=k;for(;$+1<p&&b($+1,_);)$++;let S=_;for(;S+1<g&&Array.from({length:$-k+1},(E,R)=>b(k+R,S+1)).every(Boolean);)S++;for(let E=_;E<=S;E++)for(let R=k;R<=$;R++)y[E][R]=!0;let z=d[k]-n,A=d[$+1]+n,I=h[_]-n,x=h[S+1]+n;Math.min(A-z,x-I)<.8||s.push({id:e(s.length),x0:a(z),z0:a(I),x1:a(A),z1:a(x),shape:"gable",axis:A-z>=x-I?"x":"z",eave_a:a(m),eave_b:a(m),pitch_a:t,pitch_b:t,base:a(m),overhang:null})}r.push(...c)}return s}var Le=Math.PI/180,Ws=1.13,Tn=1.72,ce=.025,ze=.07,Ls=.25;function de(o,e){let t=[];for(let n of o.floors){if(e&&n.id!==e)continue;let{walls:i}=fe(n.rooms,{exterior:o.settings.wall_exterior,interior:o.settings.wall_interior},n.walls??[]);for(let s of i){if(!s.exterior||s.free)continue;let r=s.b[0]-s.a[0],a=s.b[1]-s.a[1],l=Math.hypot(r,a);if(l<1.2)continue;let c=a/l,d=-r/l,h=[s.a[0]+c*s.right,n.elevation,s.a[1]+d*s.right],p=Math.min(n.height,s.height??n.height);t.push({key:`wall:${n.id}:${s.id}`,section:null,side:"top",flat:!1,o:h,eu:[r/l,0,a/l],es:[0,1,0],n:[c,0,d],lu:l,ls:p,pitch:90,span:()=>[0,l],facing:[c,d],wall:{floorId:n.id}})}}return t}var be="ground";function go(o){return[...o.floors.filter(t=>t.rooms.some(n=>n.points.length>=3))].sort((t,n)=>t.elevation-n.elevation)[0]??o.floors[0]??null}function Hs(o,e){let t=(e.rotation??0)*Math.PI/180,n=[Math.cos(t),0,Math.sin(t)],i=[-Math.sin(t),0,Math.cos(t)],s=go(o),r=n[0]*e.u+i[0]*e.v,a=n[2]*e.u+i[2]*e.v,l=s?s.elevation+(e.base!=null?e.base:Ni(s,r,a)):e.base??0;return{key:be,section:null,side:"top",flat:!0,o:[0,l,0],eu:n,es:i,n:[0,1,0],lu:1e4,ls:1e4,pitch:0,span:()=>[-1e4,1e4],facing:[i[0],i[2]],unbounded:!0}}function te(o,e,t=q(o)){return e.face===be?Hs(o,e):e.face.startsWith("wall:")?de(o,e.face.split(":")[1]).find(n=>n.key===e.face)??null:t.find(n=>n.key===e.face)??null}function Vs(o,e,t){let n=de(o,t),i=o.settings.north??0,s=l=>{let c=Math.atan2(l.facing[0],-l.facing[1])*180/Math.PI-i;return l.lu*(1.3+Math.cos((c-180)*Math.PI/180))},r=[...n].sort((l,c)=>s(c)-s(l))[0];if(!r)return null;let a={...Ve(r,e),portrait:!1,rows:1};return a.cols=Math.max(1,Math.floor((r.lu-.8+ce)/(Tn+ce))),a.u=Math.round((r.lu-(a.cols*Tn+(a.cols-1)*ce))/2*100)/100,a.v=Math.round(Math.max(0,r.ls-Ws-.3)*100)/100,a}function Dn(o,e){let t=o.floors.flatMap(s=>s.rooms.flatMap(r=>r.points)),n=t.length?Math.max(...t.map(s=>s[0]))+3:0,i=t.length?Math.min(...t.map(s=>s[1])):0;return{id:e,face:be,u:Math.round(n*100)/100,v:Math.round(i*100)/100,rows:2,cols:4,portrait:!0,tilt:25,flip:!0,rotation:(o.settings.north??0)||0,look:"black",entity:null}}function Wn(o){return o.floors.filter(t=>t.rooms.some(n=>n.points.length>=3)).sort((t,n)=>n.elevation-t.elevation)[0]??null}function q(o){let e=o.settings.roof;if(!e||e.type==="none")return[];if(e.type==="custom")return(e.sections??[]).flatMap(m=>_o(m,Ps(o,m,m.overhang??e.overhang)));let t=Wn(o);if(!t)return[];let n=t.rooms.flatMap(m=>m.points.map(_=>_[0])),i=t.rooms.flatMap(m=>m.points.map(_=>_[1])),s=o.settings.wall_exterior+e.overhang,r=Math.min(...n)-s,a=Math.max(...n)+s,l=Math.min(...i)-s,c=Math.max(...i)+s,d=t.elevation+t.height;if(e.type==="flat")return[Bs("main",null,r,l,a,c,d+Ls)];let h=a-r>=c-l,p=e.ridge==="short"?!h:h,g=(p?c-l:a-r)/2,f=g*Math.tan(e.pitch*Le),u=(m,_,k)=>p?[m,d+k,(l+c)/2+_]:[(r+a)/2+_,d+k,m],[y,b]=p?[r,a]:[l,c];return[-1,1].map(m=>Pt(`main:${m<0?"a":"b"}`,null,m<0?"a":"b",u(y,m*g,0),u(b,m*g,0),u(y,0,f),e.pitch,()=>[0,b-y]))}function _o(o,e){let t=We(o),n=at(o),i=(u,y,b)=>{let[m,_]=t.at(u,y);return[m,b,_]},s=Math.max(0,e.a),r=Math.max(0,e.b),a=t.u0-Math.max(0,e.u0),l=t.u1+Math.max(0,e.u1),c=l-a;if(o.shape==="flat"){let u=t.at(a,-s),y=t.at(l,t.w+r);return[Bs(o.id,o.id,Math.min(u[0],y[0]),Math.min(u[1],y[1]),Math.max(u[0],y[0]),Math.max(u[1],y[1]),o.eave_a+Ls)]}if(o.shape==="pent")return[Pt(`${o.id}:a`,o.id,"a",i(a,-s,n.y(-s)),i(l,-s,n.y(-s)),i(a,t.w+r,n.y(t.w+r)),o.pitch_a,()=>[0,c])];let d=o.shape==="hip",h=d?Math.min((t.u1-t.u0)/2,Math.min(n.vr,t.w-n.vr)||t.w/2):0,p=d?t.u0+h-a:0,g=d?l-(t.u1-h):0,f=[];if(n.vr>.3){let u=Math.hypot(n.vr+s,n.rh-n.y(-s));f.push(Pt(`${o.id}:a`,o.id,"a",i(a,-s,n.y(-s)),i(l,-s,n.y(-s)),i(a,n.vr,n.rh),o.pitch_a,y=>[p*(y/u),c-g*(y/u)]))}if(t.w-n.vr>.3){let u=Math.hypot(t.w+r-n.vr,n.rh-n.y(t.w+r));f.push(Pt(`${o.id}:b`,o.id,"b",i(l,t.w+r,n.y(t.w+r)),i(a,t.w+r,n.y(t.w+r)),i(l,n.vr,n.rh),o.pitch_b,y=>[g*(y/u),c-p*(y/u)]))}return f}function Pt(o,e,t,n,i,s,r,a){let l=Rt(It(i,n)),c=Rt(It(s,n)),d=Rt(bo(l,c));d[1]<0&&(d=[-d[0],-d[1],-d[2]]);let h=Rt([-c[0],0,-c[2]]);return{key:o,section:e,side:t,flat:!1,o:n,eu:l,es:c,n:d,lu:On(It(i,n)),ls:On(It(s,n)),pitch:r,span:a,facing:[h[0],h[2]]}}function Bs(o,e,t,n,i,s,r){let a=i-t>=s-n,l=a?i-t:s-n,c=a?s-n:i-t;return{key:`${o}:top`,section:e,side:"top",flat:!0,o:[t,r,n],eu:a?[1,0,0]:[0,0,1],es:a?[0,0,1]:[1,0,0],n:[0,1,0],lu:l,ls:c,pitch:0,span:()=>[0,l],facing:a?[0,1]:[1,0]}}function lt(o){let e=o.module_w||Ws,t=o.module_h||Tn;return o.portrait===!1?[t,e]:[e,t]}function Tt(o){return o.layout?.length?o.layout.map(e=>Math.max(0,Math.min(60,Math.round(e)))):Array.from({length:Math.max(1,o.rows)},()=>Math.max(1,o.cols))}function Ln(o,e){return o.flat?Math.min(45,Math.max(0,e.tilt??15))*Le:o.wall?Math.min(90,Math.max(0,e.tilt??0))*Le:0}function He(o,e){let[t,n]=lt(e),i=Tt(e),s=Math.max(1,...i),a=(i.length-1)*Hn(o,e)+n*Math.cos(Ln(o,e));return[s*t+(s-1)*ce,a]}function Hn(o,e){let[,t]=lt(e),n=Ln(o,e);return o.wall?t*Math.cos(n)+ce:o.flat?t*Math.cos(n)+Math.max(.3,2*t*Math.sin(n)):t+ce}function me(o,e,t=!1){let[n,i]=lt(e),s=[],r=Ln(o,e),a=i*Math.cos(r),l=Hn(o,e),c=Tt(e),d=Math.max(1,...c),h=new Set(e.skip??[]),p=(f,u,y)=>[o.o[0]+o.eu[0]*f+o.es[0]*u+o.n[0]*y,o.o[1]+o.eu[1]*f+o.es[1]*u+o.n[1]*y,o.o[2]+o.eu[2]*f+o.es[2]*u+o.n[2]*y],g=(f,u)=>{if(o.unbounded)return!0;if(u<-1e-6||u>o.ls+1e-6)return!1;let[y,b]=o.span(u);return f>=y-1e-6&&f<=b+1e-6};return c.forEach((f,u)=>{let y=e.align==="right"?d-f:e.align==="center"?(d-f)/2:0;for(let b=0;b<f;b++){let m=`${u}:${b}`,_=h.has(m);if(_&&!t)continue;let k=e.u+(b+y)*(n+ce),$=e.v+u*l,S=k+n,z=$+(o.flat||o.wall?a:i);if(![[k,$],[S,$],[S,z],[k,z]].every(([T,P])=>g(T,P)))continue;if(o.wall&&r>.001){let T=ze+i*Math.sin(r),[P,O]=e.flip?[T,ze]:[ze,T],N=[p(k,$,P),p(S,$,P),p(S,z,O),p(k,z,O)],B=e.flip?$:z,L=[k+.05,S-.05].map(U=>[p(U,B,0),p(U,B,T)]);s.push({corners:N,posts:L,cell:m,skipped:_});continue}if(!o.flat){s.push({corners:[p(k,$,ze),p(S,$,ze),p(S,z,ze),p(k,z,ze)],posts:[],cell:m,skipped:_});continue}let A=.15,I=A+i*Math.sin(r),[x,E]=e.flip?[z,$]:[$,z],R=[p(k,x,A),p(S,x,A),p(S,E,I),p(k,E,I)];s.push({corners:R,posts:[k+.05,S-.05].flatMap(T=>[[p(T,x,0),p(T,x,A)],[p(T,E,0),p(T,E,I)]]),cell:m,skipped:_})}}),s}function Ot(o,e){let t=[o.eu[0],o.eu[2]],n=[o.es[0],o.es[2]],i=[e[0]-o.o[0],e[1]-o.o[2]],s=t[0]*n[1]-t[1]*n[0];if(Math.abs(s)<1e-9)return null;let r=(i[0]*n[1]-i[1]*n[0])/s,a=(t[0]*i[1]-t[1]*i[0])/s;if(a<0||a>o.ls)return null;let[l,c]=o.span(a);return r>=l&&r<=c?{u:r,s:a}:null}function Cs(o,e){let t=null;for(let n of o){if(n.wall){let r=[e[0]-n.o[0],e[1]-n.o[2]],a=r[0]*n.eu[0]+r[1]*n.eu[2],l=r[0]*n.n[0]+r[1]*n.n[2];if(a>=0&&a<=n.lu&&l>=-.05&&l<=.35)return{face:n,u:a,s:Number.NaN};a>=0&&a<=n.lu&&l>.35&&l<=.8&&!t&&(t={face:n,u:a,s:Number.NaN,y:-1/0});continue}let i=Ot(n,e);if(!i)continue;let s=n.o[1]+n.es[1]*i.s;(!t||s>t.y)&&(t={face:n,...i,y:s})}return t?{face:t.face,u:t.u,s:t.s}:null}function ct(o,e){if(o.unbounded)return{u:e.u,v:e.v};let[t,n]=He(o,e),i=s=>Math.floor(s*100+1e-6)/100;return{u:i(Math.min(Math.max(0,e.u),Math.max(0,o.lu-t))),v:i(Math.min(Math.max(0,e.v),Math.max(0,o.ls-n)))}}function Ve(o,e){let t={id:e,face:o.key,u:0,v:0,rows:1,cols:1,portrait:!0,tilt:o.flat?15:null,flip:!1,entity:null,look:"black"},[n]=lt(t),i=.4,s=Hn(o,t),[r,a]=o.span(o.ls/2);for(t.cols=Math.max(1,Math.floor((a-r-2*i+ce)/(n+ce))),t.rows=Math.max(1,Math.min(4,Math.floor((o.ls-2*i)/s)));t.cols>1&&me(o,{...t,u:Ds(o,t),v:i}).length<t.rows*t.cols;)t.cols--;return t.u=Ds(o,t),t.v=i,t}function Ds(o,e){let[t]=lt(e),n=e.cols*t+(e.cols-1)*ce;return Math.round((o.lu-n)/2*100)/100}function Vn(o,e){let t=(Math.atan2(o.facing[0],-o.facing[1])/Le-e+720)%360;return["n","ne","e","se","s","sw","w","nw"][Math.round(t/45)%8]}function Dt(o,e){let t=n=>{if(n.flat)return n.lu*n.ls*.8;let i=(Math.atan2(n.facing[0],-n.facing[1])/Le-e+720)%360,s=Math.cos((i-180)*Le);return n.lu*n.ls*(1.2+s)};return[...o].sort((n,i)=>t(i)-t(n))[0]??null}function It(o,e){return[o[0]-e[0],o[1]-e[1],o[2]-e[2]]}function On(o){return Math.hypot(o[0],o[1],o[2])}function Rt(o){let e=On(o)||1;return[o[0]/e,o[1]/e,o[2]/e]}function bo(o,e){return[o[1]*e[2]-o[2]*e[1],o[2]*e[0]-o[0]*e[2],o[0]*e[1]-o[1]*e[0]]}var Ns=.78,Ks=1.18;function Be(o){return{id:o.id,face:o.face,u:o.u,v:o.v,rows:1,cols:1,portrait:!0,module_w:o.w||Ns,module_h:o.h||Ks}}function Gs(o,e){let t=me(o,Be(e))[0];if(!t)return null;let n=i=>[i[0]-o.n[0]*.05,i[1]-o.n[1]*.05,i[2]-o.n[2]*.05];return[n(t.corners[0]),n(t.corners[1]),n(t.corners[2]),n(t.corners[3])]}function Bn(o,e){let t=Ns,n=Ks,[i,s]=o.span(o.ls/2);return{id:e,face:o.key,u:Math.round((i+s-t)/2*100)/100,v:Math.round(Math.max(0,Math.min(o.ls-n,o.ls*.45-n/2))*100)/100,w:null,h:null,cover:null,contact:null,tilt:null}}function dt(o,e,t){let n=Hs(o,e),[i,s]=He(n,e),r=n.eu[0]*(e.u+i/2)+n.es[0]*(e.v+s/2),a=n.eu[2]*(e.u+i/2)+n.es[2]*(e.v+s/2),l=t*Math.PI/180,c=[Math.cos(l),Math.sin(l)],d=[-Math.sin(l),Math.cos(l)],h=r*c[0]+a*c[1]-i/2,p=r*d[0]+a*d[1]-s/2,g=f=>Math.round(f*100)/100;return{u:g(h),v:g(p),rotation:(Math.round(t)%360+360)%360}}function ht(o,e){let[t,n]=He(o,e);return[o.o[0]+o.eu[0]*(e.u+t/2)+o.es[0]*(e.v+n/2),o.o[2]+o.eu[2]*(e.u+t/2)+o.es[2]*(e.v+n/2)]}function Cn(o,e,t){let n=t[0]*o.n[0]+t[1]*o.n[1]+t[2]*o.n[2];if(Math.abs(n)<1e-6)return null;let i=((o.o[0]-e[0])*o.n[0]+(o.o[1]-e[1])*o.n[1]+(o.o[2]-e[2])*o.n[2])/n;if(i<=0)return null;let s=[e[0]+t[0]*i-o.o[0],e[1]+t[1]*i-o.o[1],e[2]+t[2]*i-o.o[2]],r=s[0]*o.eu[0]+s[1]*o.eu[1]+s[2]*o.eu[2],a=s[0]*o.es[0]+s[1]*o.es[1]+s[2]*o.es[2];return{t:i,u:r,s:a}}function js(o,e,t){if(o.unbounded)return!0;if(t<0||t>o.ls)return!1;let[n,i]=o.span(t);return e>=n&&e<=i}function Us(o,e,t,n){for(let i of me(o,e)){let s=i.corners.map(d=>{let h=[d[0]-o.o[0],d[1]-o.o[1],d[2]-o.o[2]];return[h[0]*o.eu[0]+h[1]*o.eu[1]+h[2]*o.eu[2],h[0]*o.es[0]+h[1]*o.es[1]+h[2]*o.es[2]]}),[r,a]=[Math.min(...s.map(d=>d[0])),Math.max(...s.map(d=>d[0]))],[l,c]=[Math.min(...s.map(d=>d[1])),Math.max(...s.map(d=>d[1]))];if(t>=r-.05&&t<=a+.05&&n>=l-.05&&n<=c+.05)return!0}return!1}var se=.03,qs=o=>o&&o!=="none"?o:null;function Qs(o,e=t=>qs(t.power)){let t={grid:null,solar:[],battery:[],soc:[]};for(let n of o.floors)for(let i of n.furniture){let s=e(i);if(i.type==="meter")t.grid??=s;else if(i.type==="inverter"&&s&&!t.solar.includes(s))t.solar.push(s);else if(i.type==="home_battery"){s&&!t.battery.includes(s)&&t.battery.push(s);let r=qs(i.soc);r&&!t.soc.includes(r)&&t.soc.push(r)}}return t}function Kn(o){for(let e of o.floors){let t=e.furniture.find(n=>n.type==="meter");if(t)return{floor_id:e.id,x:t.x,z:t.z}}return o.energy.meter}function Wt(o,e,t="power"){if(!e)return null;let n=o.entities?.[e]?.device_id;if(!n)return null;let i=Object.keys(o.states).filter(a=>a.startsWith("sensor.")&&o.entities?.[a]?.device_id===n&&o.states[a]?.attributes.device_class===t);if(i.length<=1)return i[0]??null;let s=i.filter(a=>!/(phase|_l[123]\b|_[abc]$|today|daily|heute)/.test(a)),r=e.replace(/^sensor\./,"").replace(/_?(energy|energie|total|today|daily|kwh|import|export|consumption|production)/g,"");return s.find(a=>r&&a.includes(r))??s[0]??i[0]}function er(o,e){let t={};for(let n of e.energy_sources??[])if(n.type==="grid"){let i=n.flow_from?.[0]?.stat_energy_from??n.flow_to?.[0]?.stat_energy_to,s=Wt(o,i);s&&!t.grid&&(t.grid=s)}else if(n.type==="solar"){let i=Wt(o,n.stat_energy_from);i&&!t.solar&&(t.solar=i)}else if(n.type==="battery"){let i=Wt(o,n.stat_energy_from??n.stat_energy_to);i&&!t.battery&&(t.battery=i);let s=Wt(o,n.stat_energy_from??n.stat_energy_to,"battery");s&&!t.battery_soc&&(t.battery_soc=s)}return t}var vo=.07;function Ce(o,e){return o.pos.push(e),o.adj.push([]),o.pos.length-1}function ve(o,e,t){let n=Math.hypot(o.pos[e][0]-o.pos[t][0],o.pos[e][1]-o.pos[t][1]);o.adj[e].push({to:t,w:n}),o.adj[t].push({to:e,w:n})}function yo(o,e){let t=o.length,n=o.map((i,s)=>{let r=o[(s+1)%t],a=r[0]-i[0],l=r[1]-i[1],c=Math.hypot(a,l)||1,d=-l/c,h=a/c;return{p:[i[0]+d*e[s],i[1]+h*e[s]],d:[a/c,l/c],n:[d,h]}});return o.map((i,s)=>{let r=n[(s-1+t)%t],a=n[s],l=r.d[0]*a.d[1]-r.d[1]*a.d[0];if(Math.abs(l)<1e-6)return[i[0]+a.n[0]*e[s],i[1]+a.n[1]*e[s]];let c=((a.p[0]-r.p[0])*a.d[1]-(a.p[1]-r.p[1])*a.d[0])/l;return[r.p[0]+r.d[0]*c,r.p[1]+r.d[1]*c]})}function wo(o){return Q(o.points)>=0?{pts:o.points,flipped:!1}:{pts:[...o.points].reverse(),flipped:!0}}function Gn(o,e,t){let n={pos:[],adj:[],rings:new Map},{walls:i}=fe(o.rooms,{exterior:e,interior:t},o.walls??[]);for(let s of o.rooms){if(s.points.length<3)continue;let{pts:r,flipped:a}=wo(s),l=r.length,c=r.map((p,g)=>{let f=a?(l-2-g+l)%l:g,u=i.some(y=>!y.exterior&&y.sources.some(b=>b.room_id===s.id&&b.edge===f));return vo+(u?t/2:0)}),d=yo(r,c).map(p=>Ce(n,p)),h=d.map((p,g)=>[p,d[(g+1)%l]]);for(let[p,g]of h)ve(n,p,g);n.rings.set(s.id,h)}for(let s of i){if(s.exterior||!s.roomLeft||!s.roomRight)continue;let r=[(s.a[0]+s.b[0])/2,(s.a[1]+s.b[1])/2],a=Ee(n,s.roomLeft,r),l=Ee(n,s.roomRight,r);a!==null&&l!==null&&ve(n,a,l)}return n}function Ee(o,e,t){let n=o.rings.get(e);if(!n)return null;let i=null;for(let r of n){let a=o.pos[r[0]],l=o.pos[r[1]],c=l[0]-a[0],d=l[1]-a[1],h=c*c+d*d||1,p=Math.min(1,Math.max(0,((t[0]-a[0])*c+(t[1]-a[1])*d)/h)),g=[a[0]+c*p,a[1]+d*p],f=Math.hypot(t[0]-g[0],t[1]-g[1]);(!i||f<i.d)&&(i={seg:r,q:g,d:f})}if(!i)return null;let s=Ce(o,i.q);return ve(o,s,i.seg[0]),ve(o,s,i.seg[1]),s}function pt(o,e){let t=o.rooms.filter(s=>s.points.length>=3),n=t.find(s=>D(e,s.points));if(n)return n;let i=null;for(let s of t)for(let r of s.points){let a=Math.hypot(e[0]-r[0],e[1]-r[1]);(!i||a<i.d)&&(i={room:s,d:a})}return i?.room??null}function tr(o,e){let t=o.pos.map(()=>1/0),n=o.pos.map(()=>-1),i=o.pos.map(()=>!1);for(t[e]=0;;){let s=-1;for(let r=0;r<t.length;r++)!i[r]&&t[r]<1/0&&(s<0||t[r]<t[s])&&(s=r);if(s<0)break;i[s]=!0;for(let{to:r,w:a}of o.adj[s])t[s]+a<t[r]-1e-9&&(t[r]=t[s]+a,n[r]=s)}return{dist:t,prev:n}}function Xs(o,e){return o.every(t=>e[t].kind==="battery")?"battery":o.every(t=>e[t].kind==="wallbox")?"wallbox":"consumer"}var Zs=new WeakMap;function ko(o,e){let t=Kn(o),n=o.floors.find(d=>d.id===t.floor_id),i=[],{wall_exterior:s,wall_interior:r}=o.settings,a=new Map,l=new Map;e.forEach((d,h)=>l.set(d.floorId,[...l.get(d.floorId)??[],h]));let c=o.floors.filter(d=>l.has(d.id));for(let d of c){if(d.id===n.id)continue;let h=d.elevation>n.elevation,p=l.get(d.id),g=Xs(p,e);i.push({floorId:n.id,a:[t.x,se,t.z],b:[t.x,h?n.height:-.2,t.z],dist:0,members:p,kind:g});let f=Math.abs(d.elevation-n.elevation);i.push({floorId:d.id,a:[t.x,h?-.2:d.height,t.z],b:[t.x,se,t.z],dist:f,members:p,kind:g}),a.set(d.id,f+.25)}for(let d of c){let h=Gn(d,s,r),p=pt(d,[t.x,t.z]);if(!p)continue;let g=Ce(h,[t.x,t.z]),f=Ee(h,p.id,[t.x,t.z]);if(f===null)continue;ve(h,g,f);let u=[];for(let k of l.get(d.id)){let $=e[k],S=pt(d,[$.x,$.z]);if(!S)continue;let z=Ce(h,[$.x,$.z]),A=Ee(h,S.id,[$.x,$.z]);A!==null&&(ve(h,z,A),u.push({node:z,member:k}))}let{dist:y,prev:b}=tr(h,g),m=new Map;for(let k of u)if(Number.isFinite(y[k.node]))for(let $=k.node;b[$]>=0;$=b[$]){let S=b[$],z=`${S}>${$}`,A=m.get(z)??{a:S,b:$,members:[]};A.members.push(k.member),m.set(z,A)}let _=a.get(d.id)??0;for(let{a:k,b:$,members:S}of m.values()){let z=h.pos[k],A=h.pos[$],I=Xs(S,e);i.push({floorId:d.id,a:[z[0],se,z[1]],b:[A[0],se,A[1]],dist:_+y[k],members:S,kind:I})}}return i}function nr({building:o,consumers:e,summary:t,battery:n,fieldPower:i,devicePower:s}){let r=Kn(o);if(!r)return[];let a=o.floors.find(x=>x.id===r.floor_id);if(!a)return[];let l=x=>s?.get(x),c=Nn(o,"inverter"),d=Nn(o,"home_battery");!d.length&&n&&d.push({id:"battery",type:"home_battery",floorId:n.floorId,x:n.x,z:n.z,h:1.1,variant:null});let h=x=>{let E=null;for(let R of c)R.floorId===x.floorId&&(!E||Math.hypot(R.x-x.x,R.z-x.z)<Math.hypot(E.x-x.x,E.z-x.z))&&(E=R);return E},p=x=>l(x.id)??(d.length===1?t.battery??0:0),g=new Map;for(let x of d){let E=h(x);E&&g.set(x.id,E)}let f=e.map(x=>({floorId:x.floorId,x:x.x,z:x.z,kind:x.wallbox?"wallbox":"consumer",power:x.power}));for(let x of d)!g.has(x.id)&&t.battery!==null&&f.push({floorId:x.floorId,x:x.x,z:x.z,kind:"battery",power:Math.abs(p(x))});let u=`${r.floor_id}:${r.x},${r.z}|${f.map(x=>`${x.floorId}:${x.x},${x.z}:${x.kind}`).join(";")}`,y=Zs.get(o);y||Zs.set(o,y=new Map);let b=y.get(u);b||(b=ko(o,f),y.clear(),y.set(u,b));let m=b.map(x=>({floorId:x.floorId,a:x.a,b:x.b,dist:x.dist,power:x.members.reduce((E,R)=>E+f[R].power,0),kind:x.kind})),_=t.grid!==null?jn(o):null,k=o.settings.roof.cables??[],$=x=>k.find(E=>E.id===x),S=(x,E)=>x.map(R=>({...R,key:E}));if(_){let x=t.grid>=0,E=$("grid"),R=E?Lt(o,E,[_.end[0],a.elevation+se,_.end[1]],[r.x,a.elevation+.4+1.1,r.z]):[[_.end[0],se,_.end[1]],[_.wall[0],se,_.wall[1]],[r.x,se,r.z]],T=E?ut(o,x?R:[...R].reverse(),Math.abs(t.grid),x?"grid":"export",a):sr(a.id,x?R:[...R].reverse(),Math.abs(t.grid),x?"grid":"export",0);m.push(...S(T,"grid"))}if(t.battery!==null&&t.battery>0)for(let x of m)x.kind==="battery"&&([x.a,x.b]=[x.b,x.a]);let z=o.settings.roof.solar??[],A=o.settings.roof.strings??[],I=new Map;if(i&&z.length){let x=[...q(o),...de(o)];for(let E of z){let R=i.get(E.id)??0,T=E.string?A.find(W=>W.id===E.string)?.inverter:null,P=T?c.find(W=>W.id===T)??null:null;if(!P&&c.length){let W=te(o,E,x),K=W?ht(W,E):[E.u,E.v];P=c.reduce((J,re)=>!J||Math.hypot(re.x-K[0],re.z-K[1])<Math.hypot(J.x-K[0],J.z-K[1])?re:J,null)}P&&I.set(P.id,(I.get(P.id)??0)+R);let O=P??{floorId:r.floor_id,x:r.x,z:r.z},N=P?1.1+P.h:1.5,B=$(`solar:${E.id}`),L=B?$o(o,E):null,U=o.floors.find(W=>W.id===O.floorId);B&&L&&U?m.push(...S(ut(o,Lt(o,B,L,[O.x,U.elevation+N,O.z]),R,"solar",U),`solar:${E.id}`)):m.push(...S(So(o,E,R,O,N),`solar:${E.id}`))}}else t.solar!==null&&!c.length&&m.push({floorId:a.id,a:[r.x+.08,a.height+.6,r.z+.08],b:[r.x+.08,se,r.z+.08],dist:0,power:t.solar,kind:"solar"});for(let x of c){let E=1.1+x.h,R=d.filter(O=>g.get(O.id)===x),T=l(x.id);if(T===void 0){T=I.get(x.id)??(c.length===1?t.solar??0:0);for(let O of R)T+=p(O)}let P=o.floors.find(O=>O.id===x.floorId);if(t.solar!==null||t.battery!==null){let O=$(`inv:${x.id}`),N=O&&P?ut(o,Lt(o,O,[x.x,P.elevation+E,x.z],[r.x,a.elevation+1.5,r.z]),Math.max(0,T),"inverter",P):Js(o,x,E,{floorId:r.floor_id,x:r.x,z:r.z},1.5,Math.max(0,T),"inverter",0);m.push(...S(N,`inv:${x.id}`))}for(let O of R){let N=p(O);if(t.battery===null&&l(O.id)===void 0)continue;let B=O.variant==="wall"?.5+O.h:.9,L=$(`bat:${O.id}`),U=L&&P?ut(o,Lt(o,L,[x.x,P.elevation+E-.1,x.z],[O.x,P.elevation+B,O.z]),Math.abs(N),"battery",P):Js(o,x,E-.1,O,B,Math.abs(N),"battery",0);m.push(...S(N<=0?U:U.map(W=>({...W,a:W.b,b:W.a})).reverse(),`bat:${O.id}`))}}return m}function jn(o){let e=Kn(o),t=e?o.floors.find(g=>g.id===e.floor_id):void 0;if(!e||!t)return null;let{wall_exterior:n,wall_interior:i}=o.settings,{walls:s}=fe(t.rooms,{exterior:n,interior:i},t.walls??[]),r=Nn(o,"grid_point")[0],a=s.filter(g=>g.exterior);if(r){let g=null;for(let u of a){let y=u.b[0]-u.a[0],b=u.b[1]-u.a[1],m=r.x-e.x,_=r.z-e.z,k=m*b-_*y;if(Math.abs(k)<1e-9)continue;let $=((u.a[0]-e.x)*b-(u.a[1]-e.z)*y)/k,S=((u.a[0]-e.x)*_-(u.a[1]-e.z)*m)/k;if($<=0||$>1||S<0||S>1||g&&$>=g.t)continue;let z=Math.hypot(y,b)||1;g={q:[e.x+m*$,e.z+_*$],out:[b/z,-y/z],t:$}}let f=g?[g.q[0]+g.out[0]*(n/2+.05),g.q[1]+g.out[1]*(n/2+.05)]:[e.x,e.z];return{floorId:t.id,wall:f,end:[r.x,r.z]}}let l=null;for(let g of a){let f=g.b[0]-g.a[0],u=g.b[1]-g.a[1],y=f*f+u*u||1,b=Math.min(1,Math.max(0,((e.x-g.a[0])*f+(e.z-g.a[1])*u)/y)),m=[g.a[0]+f*b,g.a[1]+u*b],_=Math.hypot(e.x-m[0],e.z-m[1]),k=Math.sqrt(y);(!l||_<l.d)&&(l={q:m,out:[u/k,-f/k],d:_})}if(!l)return null;let{q:c,out:d}=l,h=0;for(let g of o.floors)for(let f of g.outdoor??[]){let u=f.points.length;for(let y=0;y<u;y++){let b=f.points[y],m=f.points[(y+1)%u],_=m[0]-b[0],k=m[1]-b[1],$=d[0]*k-d[1]*_;if(Math.abs($)<1e-9)continue;let S=((b[0]-c[0])*k-(b[1]-c[1])*_)/$,z=((b[0]-c[0])*d[1]-(b[1]-c[1])*d[0])/$;S>0&&z>=0&&z<=1&&(h=Math.max(h,Math.min(15,S)))}}let p=h>n+1?h:n+2.5;return{floorId:t.id,wall:[c[0]+d[0]*(n/2+.05),c[1]+d[1]*(n/2+.05)],end:[c[0]+d[0]*p,c[1]+d[1]*p]}}function Nn(o,e){let t=[];for(let n of o.floors)for(let i of n.furniture)i.type===e&&t.push({id:i.id,type:i.type,floorId:n.id,x:i.x,z:i.z,h:i.h,variant:i.variant??null});return t}var Ys=new WeakMap;function ir(o,e,t,n){let i=`${e.id}:${t.join(",")}>${n.join(",")}`,s=Ys.get(o);s||Ys.set(o,s=new Map);let r=s.get(i);if(r)return r;let{wall_exterior:a,wall_interior:l}=o.settings,c=Gn(e,a,l),d=[t,n],h=pt(e,t),p=pt(e,n);if(h&&p){let g=Ce(c,t),f=Ee(c,h.id,t),u=Ce(c,n),y=Ee(c,p.id,n);if(f!==null&&y!==null){ve(c,g,f),ve(c,u,y);let{dist:b,prev:m}=tr(c,g);if(Number.isFinite(b[u])){d.length=0;for(let _=u;_>=0;_=m[_])d.unshift(c.pos[_])}}}return s.set(i,d),d}function Js(o,e,t,n,i,s,r,a){let l=o.floors.find(h=>h.id===e.floorId);if(!l||e.floorId!==n.floorId)return[];let c=ir(o,l,[e.x,e.z],[n.x,n.z]),d=[[e.x,t,e.z],...c.map(h=>[h[0],se,h[1]]),[n.x,i,n.z]];return sr(l.id,d,s,r,a)}function sr(o,e,t,n,i){let s=[];for(let r=0;r+1<e.length;r++){let a=e[r],l=e[r+1],c=Math.hypot(l[0]-a[0],l[1]-a[1],l[2]-a[2]);c<1e-4||(s.push({floorId:o,a,b:l,dist:i,power:t,kind:n}),i+=c)}return s}function Lt(o,e,t,n){let s=(o.floors.find(r=>r.id===e.floor_id)?.elevation??0)+Math.max(se,e.height);return[t,...e.points.map(r=>[r[0],s,r[1]]),n]}function $o(o,e){let t=te(o,e,[...q(o),...de(o)]);if(!t)return null;let[n,i]=He(t,e),s=e.u+n/2,r=t.unbounded?e.v+i/2:e.v;return[t.o[0]+t.eu[0]*s+t.es[0]*r,t.o[1]+t.eu[1]*s+t.es[1]*r,t.o[2]+t.eu[2]*s+t.es[2]*r]}function xo(o,e,t){let{wall_exterior:n,wall_interior:i}=o.settings,s=Gn(e,n,i),r=pt(e,t),a=r?Ee(s,r.id,t):null;return a===null?t:s.pos[a]}function ut(o,e,t,n,i){let s=[...o.floors].sort((c,d)=>c.elevation-d.elevation),r=c=>{let d=i;for(let h of s)c>=h.elevation-.01&&(d=h);return d},a=[],l=0;for(let c=0;c+1<e.length;c++){let d=e[c],h=e[c+1];if(Math.hypot(h[0]-d[0],h[1]-d[1],h[2]-d[2])<1e-4)continue;let g=[];if(Math.abs(h[1]-d[1])>.01){let f=Math.min(d[1],h[1]),u=Math.max(d[1],h[1]);for(let y of s)y.elevation>f+.01&&y.elevation<u-.01&&g.push(y.elevation);h[1]<d[1]&&g.reverse()}for(let f of[...g,h[1]]){let u=(f-d[1])/(h[1]-d[1]||1),y=Math.abs(h[1]-d[1])>.01?[d[0]+(h[0]-d[0])*u,f,d[2]+(h[2]-d[2])*u]:h,b=r((d[1]+y[1])/2),m=Math.hypot(y[0]-d[0],y[1]-d[1],y[2]-d[2]);m>1e-4&&a.push({floorId:b.id,a:[d[0],d[1]-b.elevation,d[2]],b:[y[0],y[1]-b.elevation,y[2]],dist:l,power:t,kind:n}),l+=m,d=y}}return a}function So(o,e,t,n,i){let s=[...q(o),...de(o)],r=te(o,e,s),a=o.floors.find(y=>y.id===n.floorId);if(!r||!a)return[];let[l,c]=He(r,e),d=(y,b)=>[r.o[0]+r.eu[0]*y+r.es[0]*b,r.o[1]+r.eu[1]*y+r.es[1]*b,r.o[2]+r.eu[2]*y+r.es[2]*b],h=e.u+l/2,p=a.elevation+se,g=[],f;if(r.unbounded){let y=d(h,e.v+c/2);f=[y[0],p,y[2]],g.push(f)}else if(r.wall){let y=d(h,e.v);f=[y[0],p,y[2]],g.push(y,f)}else{let y=d(h,e.v),b=Wn(o)??a,m=Math.max(a.elevation+.5,Math.min(y[1]-.25,b.elevation+b.height-.12));f=[y[0],m,y[2]],g.push(y)}let u=xo(o,a,[f[0],f[2]]);g.push([u[0],f[1],u[1]]),Math.abs(f[1]-p)>.05&&g.push([u[0],p,u[1]]);for(let y of ir(o,a,u,[n.x,n.z]).slice(1))g.push([y[0],p,y[1]]);return g.push([n.x,a.elevation+i,n.z]),ut(o,g,t,"solar",a)}var or=["kitchen_row","kitchen_l","bath","bedroom","living","dining","office","kids","hall"],Mo={kitchen_row:{rows:[{wall:"back",align:"start",items:[{type:"fridge"},{type:"kitchen_tall"},{type:"kitchen",size:[.9,.62,.92]},{type:"sink"},{type:"dishwasher"},{type:"stove"},{type:"kitchen",size:[.6,.62,.92]}]},{wall:"back",align:"start",items:[{type:"kitchen_wall",size:[1.2,.35,.7]}]}],free:[{type:"table",at:[.5,.72],rotation:0,size:[1.2,.8,.75]},{type:"lamp_pendant",at:[.5,.72],rotation:0},{type:"lamp_ceiling",at:[.5,.3],rotation:0}]},kitchen_l:{rows:[{wall:"back",align:"start",items:[{type:"fridge"},{type:"kitchen_tall"},{type:"sink"},{type:"dishwasher"},{type:"kitchen",size:[.6,.62,.92]}]},{wall:"left",align:"end",items:[{type:"stove"},{type:"kitchen",size:[1.2,.62,.92]}]}],free:[{type:"island",at:[.62,.62],rotation:0,size:[1.6,.9,.92]},{type:"bar_stool",at:[.52,.86],rotation:180},{type:"bar_stool",at:[.72,.86],rotation:180},{type:"lamp_ceiling",at:[.5,.35],rotation:0}]},bath:{rows:[{wall:"back",align:"center",items:[{type:"washbasin"}]},{wall:"back",align:"end",items:[{type:"wc"}]},{wall:"front",align:"start",items:[{type:"bathtub"}]},{wall:"left",align:"start",items:[{type:"washer"}]}],free:[{type:"lamp_downlight",at:[.5,.5],rotation:0}]},bedroom:{rows:[{wall:"back",align:"center",items:[{type:"nightstand"},{type:"bed"},{type:"nightstand"}]},{wall:"left",align:"center",items:[{type:"wardrobe",size:[2,.6,2.1]}]},{wall:"front",align:"end",items:[{type:"dresser"}]}],free:[{type:"lamp_ceiling",at:[.5,.55],rotation:0}]},living:{rows:[{wall:"back",align:"center",items:[{type:"tv_board"}]},{wall:"right",align:"start",items:[{type:"shelf"}]}],free:[{type:"sofa",at:[.5,.72],rotation:180},{type:"coffee_table",at:[.5,.52],rotation:0},{type:"rug",at:[.5,.55],rotation:0,size:[2.2,1.6,.01]},{type:"armchair",at:[.14,.5],rotation:270},{type:"lamp_floor",at:[.86,.8],rotation:0},{type:"plant",at:[.9,.12],rotation:0},{type:"lamp_ceiling",at:[.5,.45],rotation:0}]},dining:{rows:[{wall:"back",align:"center",items:[{type:"sideboard"}]}],free:[{type:"table",at:[.5,.55],rotation:0},{type:"chair",at:[.4,.35],rotation:0},{type:"chair",at:[.6,.35],rotation:0},{type:"chair",at:[.4,.75],rotation:180},{type:"chair",at:[.6,.75],rotation:180},{type:"lamp_pendant",at:[.5,.55],rotation:0}]},office:{rows:[{wall:"back",align:"center",items:[{type:"desk"}]},{wall:"left",align:"center",items:[{type:"shelf"},{type:"shelf"}]}],free:[{type:"office_chair",at:[.5,.38],rotation:180},{type:"lamp_ceiling",at:[.5,.55],rotation:0}]},kids:{rows:[{wall:"left",align:"start",items:[{type:"bed",size:[.9,2,.8]}]},{wall:"back",align:"end",items:[{type:"desk",size:[1.2,.6,.75]}]},{wall:"right",align:"end",items:[{type:"shelf"}]}],free:[{type:"rug",at:[.55,.6],rotation:0,size:[1.6,1.2,.01]},{type:"lamp_ceiling",at:[.5,.5],rotation:0}]},hall:{rows:[{wall:"left",align:"start",items:[{type:"coat_rack"}]}],free:[{type:"lamp_downlight",at:[.5,.3],rotation:0},{type:"lamp_downlight",at:[.5,.7],rotation:0}]}},zo={back:0,right:90,front:180,left:270};function ar(o,e,t){let n=ie(o.points),i=n.x1-n.x0,s=n.z1-n.z0,r=Mo[e],a=[],l=(d,h,p,g,f)=>{let[u,y,b]=f??ae[d];a.push({id:t(),type:d,x:rr(h),z:rr(p),rotation:g,w:u,d:y,h:b,variant:null,entity:null,power:null})},c=.02;for(let d of r.rows){let h=d.items.map(y=>({type:y.type,size:y.size??ae[y.type]})),p=d.wall==="back"||d.wall==="front"?i:s,g=[],f=0;for(let y of h){if(f+y.size[0]>p-.1)break;g.push(y),f+=y.size[0]}let u=d.align==="start"?.05:d.align==="end"?p-f-.05:(p-f)/2;for(let y of g){let[b,m]=y.size,_=u+b/2,k=m/2+c;d.wall==="back"?l(y.type,n.x0+_,n.z0+k,0,y.size):d.wall==="front"?l(y.type,n.x1-_,n.z1-k,180,y.size):d.wall==="right"?l(y.type,n.x1-k,n.z0+_,90,y.size):l(y.type,n.x0+k,n.z1-_,zo.left,y.size),u+=b}}for(let d of r.free){let[h,p]=d.size??ae[d.type],g=Math.min(n.x1-h/2-.05,Math.max(n.x0+h/2+.05,n.x0+i*d.at[0])),f=Math.min(n.z1-p/2-.05,Math.max(n.z0+p/2+.05,n.z0+s*d.at[1]));l(d.type,g,f,d.rotation,d.size)}return a}var rr=o=>Math.round(o*1e3)/1e3;var lr={view:"3D",editor:"Editor",all_floors:"Alle Etagen",no_building:"Noch kein Grundriss vorhanden.",no_building_admin:"Noch kein Grundriss vorhanden. Im Editor zeichnest du deine erste Etage.",open_editor:"Editor \xF6ffnen",loading:"L\xE4dt \u2026",load_error:"Laden fehlgeschlagen",saving:"Speichert \u2026",saved:"Gespeichert",save_error:"Speichern fehlgeschlagen",save_failed_detail:"Speichern fehlgeschlagen: {error}. Deine \xC4nderungen bleiben in diesem Browser erhalten.",needs_restart:"Eine neue Version von NeonPlan 3D ist installiert, aber Home Assistant l\xE4uft noch mit {version}. Bitte Home Assistant neu starten \u2013 bis dahin kann das Speichern fehlschlagen.",needs_restart_old:"Eine neue Version von NeonPlan 3D ist installiert, aber Home Assistant l\xE4uft noch mit einer \xE4lteren. Bitte Home Assistant neu starten \u2013 bis dahin schl\xE4gt das Speichern fehl.",draft_found:"Nicht gespeicherte \xC4nderungen vom {time} gefunden.",draft_restore:"\xDCbernehmen und speichern",draft_discard:"Verwerfen",walls_auto:"W\xE4nde hoch",walls_cut:"Schnitt",reset_view:"\xDCbersicht",back:"Zur\xFCck",floor:"Etage",floors:"Etagen",add_floor:"Etage hinzuf\xFCgen",floor_from_ha:"Etagen aus Home Assistant:",floor_empty:"Leere Etage",level:"Ebene {n}",ha_floor:"Etage in Home Assistant",no_ha_floor:"\u2013 keine \u2013",area_rooms:"{n} R\xE4ume aus HA-Bereichen anlegen",area_rooms_hint:"Legt f\xFCr jeden Bereich dieser Etage einen Raum an (4 \xD7 3 m) \u2013 danach an die richtige Stelle ziehen und die Ecken anpassen",floor_name:"Name",elevation:"H\xF6he \xFCber Boden (m)",height:"Raumh\xF6he (m)",cut_height:"Schnitth\xF6he (m)",delete_floor:"Etage l\xF6schen",delete_floor_confirm:"Etage \u201E{name}\u201C mit allen R\xE4umen l\xF6schen?",move_up:"Nach oben",move_down:"Nach unten",default_floor:"Erdgeschoss",new_floor:"Etage {n}",tool_select:"Ausw\xE4hlen",tool_rect:"Rechteck",tool_polygon:"Freie Form",undo:"R\xFCckg\xE4ngig",redo:"Wiederholen",fit:"Alles zeigen",room:"Raum",rooms:"R\xE4ume",room_name:"Name",area:"Bereich",no_area:"Kein Bereich",material:"Boden",x:"X (m)",z:"Y (m)",width:"Breite (m)",depth:"Tiefe (m)",points:"Eckpunkte",delete_point:"Punkt l\xF6schen",duplicate:"Duplizieren",delete:"L\xF6schen",new_room:"Raum {n}",settings:"Einstellungen",pendant_shape:"Form",pendant_shade:"Schirm",pendant_globe:"Kugel",pendant_cone:"Kegel",pendant_drum:"Trommel",pkg_open:"Einrichten \u2026",pkg_hint:"Die M\xF6bel kommen an die W\xE4nde des Raums; Leuchten verbinden sich mit den Lichtern des Bereichs. Danach einzeln anpassen \u2013 Strg+Z nimmt alles zur\xFCck.",pkg_done:"{n} M\xF6bel gesetzt \u2013 Strg+Z nimmt es zur\xFCck.",pkg_kitchen_row:"K\xFCchenzeile",pkg_kitchen_row_desc:"Zeile an der R\xFCckwand mit K\xFChlschrank, Backofen, Sp\xFCle, Sp\xFClmaschine und Herd, Oberschrank, Esstisch mit Pendelleuchte",pkg_kitchen_l:"K\xFCche in L-Form",pkg_kitchen_l_desc:"Zeile hinten und links, Kochinsel mit Barhockern",pkg_bath:"Bad",pkg_bath_desc:"Waschtisch, WC, Badewanne, Waschmaschine, Einbauspot",pkg_bedroom:"Schlafzimmer",pkg_bedroom_desc:"Doppelbett mit zwei Nachttischen, Schrank, Kommode, Deckenleuchte",pkg_living:"Wohnzimmer",pkg_living_desc:"TV-Board, Sofa, Couchtisch, Teppich, Sessel, Regal, Stehlampe, Pflanze",pkg_dining:"Esszimmer",pkg_dining_desc:"Esstisch mit vier St\xFChlen, Sideboard, Pendelleuchte",pkg_office:"B\xFCro",pkg_office_desc:"Schreibtisch mit B\xFCrostuhl, zwei Regale, Deckenleuchte",pkg_kids:"Kinderzimmer",pkg_kids_desc:"Einzelbett, Schreibtisch, Regal, Teppich",pkg_hall:"Flur",pkg_hall_desc:"Garderobe, zwei Einbauspots",spots_place:"Spots setzen",spots_type:"Leuchte",spots_cols:"Spalten (links\u2013rechts)",spots_rows:"Reihen (vorne\u2013hinten)",spots_add:"{n} Leuchten setzen",spots_placed:"{n} Leuchten gesetzt.",spots_hint:"Alle Leuchten folgen dem gew\xE4hlten Licht (z. B. Spots an einem Dimmer). Einzeln verschieben und ein anderes Licht w\xE4hlen geht danach wie bei jedem M\xF6bel.",cancel:"Abbrechen",backup:"Sicherung",backup_history:"Wiederherstellungspunkte",backup_none:"Noch keine. Beim Bearbeiten entsteht h\xF6chstens alle 10 Minuten ein Punkt.",backup_summary:"{rooms} R\xE4ume, {furniture} M\xF6bel",backup_restore:"Wiederherstellen",backup_restore_confirm:"Den Stand vom {time} wiederherstellen? Der jetzige Stand bleibt als Wiederherstellungspunkt erhalten.",backup_restored:"Wiederhergestellt.",backup_file:"Datei",backup_export:"Exportieren",backup_export_share:"Als Vorlage teilen",backup_export_share_hint:"Ohne Bereiche, Ger\xE4te, Sensoren und Bilder \u2013 zum Weitergeben an andere.",backup_import:"Importieren \u2026",backup_import_confirm:"Den ganzen Grundriss durch die Datei ersetzen? Der jetzige Stand bleibt als Wiederherstellungspunkt erhalten.",backup_import_error:"Die Datei ist kein Floorplan-3D-Plan ({error}).",backup_imported:"Importiert.",backup_hint:"Hintergrundbilder sind nicht in der Datei enthalten.",backup_full:"Komplett-Backup",backup_full_export:"Alles sichern (Plan, Bilder, Packs)",backup_full_import:"Komplett-Backup wiederherstellen \u2026",backup_full_hint:"Eine Datei mit dem Plan, allen Hintergrund- und Bildschirmbildern und den installierten Packs. Beim Wiederherstellen wird jedes Pack erneut gepr\xFCft; der Lizenzschl\xFCssel ist nicht enthalten.",backup_full_confirm:"Plan, Bilder und Packs durch das Backup ersetzen? Der aktuelle Stand bleibt als Wiederherstellungspunkt erhalten.",backup_full_not_backup:"Das ist kein Komplett-Backup von NeonPlan 3D.",backup_full_restored:"Backup wiederhergestellt: {packs} Packs, {pictures} Bilder.",backup_full_skipped:"\xDCbersprungen (nicht pr\xFCfbar oder f\xFCr eine andere Installation): {packs}.",export_name_full:"komplett",device_confirm:"Vor dem Schalten nachfragen",device_confirm_hint:"Beim Antippen in 3D, im Schnellmen\xFC und im Raumfenster erscheint erst eine R\xFCckfrage. Doppeltipp auf den Raum l\xE4sst dieses Ger\xE4t aus.",cover_confirm_hint:"Auf, Zu und Positionen fragen im Schnellmen\xFC und im Raumfenster erst nach, und Wischen \xFCber das Symbol bewegt den Rollladen nicht mehr (es dreht dann die Ansicht). Stopp fragt nie.",confirm_switch:"{name} wirklich schalten?",split_handle_hint:"Ziehen: Breite von Plan und 3D-Ansicht",wall_exterior:"Au\xDFenwand (m)",wall_interior:"Innenwand (m)",grid:"Raster (m)",background:"Vorlage (Grundriss-Bild)",background_upload:"Bild w\xE4hlen \u2026",background_width:"Breite im Plan (m)",background_opacity:"Deckkraft",background_remove:"Vorlage entfernen",hint_select:"Raum antippen zum Ausw\xE4hlen \xB7 Ecken ziehen \xB7 \u201E+\u201C auf einer Kante f\xFCgt einen Punkt ein \xB7 Pfeiltasten verschieben \xB7 Entf l\xF6scht \xB7 Strg+Z",hint_rect:"Ziehen, um ein Rechteck zu zeichnen",hint_polygon:"Punkte setzen \xB7 auf den ersten Punkt tippen oder Enter schlie\xDFt \xB7 Esc bricht ab",hint_empty:"Lege zuerst eine Etage an.",area_m2:"{a} m\xB2",overlap_warning:"R\xE4ume \xFCberlappen sich \u2013 die W\xE4nde dort sind unvollst\xE4ndig.",read_only:"Nur Administratoren k\xF6nnen den Grundriss bearbeiten.",mat_wood:"Holz",mat_oak:"Eiche",mat_tiles:"Fliesen",mat_carpet:"Teppich",mat_stone:"Stein",mat_concrete:"Beton",card_name:"NeonPlan 3D",card_description:"Deine Wohnung in 3D (Neon).",stats:"{calls} Draw-Calls \xB7 {tris} Dreiecke",stats_fps:"{fps} B/s (langsamstes Bild {ms} ms)",stats_idle:"Ruhe (0 B/s)",stats_busy_camera:"Kamera",stats_busy_floors:"Etagen",stats_busy_openings:"T\xFCren/Fenster",stats_busy_flash:"Blitz",stats_busy_roof:"Dach",stats_busy_flow:"Stromfluss",stats_busy_effect:"Farbeffekt",stats_busy_robot:"Roboter",stats_busy_orbit:"Kamerafahrt",stats_busy_tint:"Raumfarbe",stats_low:"Stufe Tablet, Pixeldichte {r}",stats_full:"volle Stufe, Pixeldichte {r}",floors_apart:"Auseinander",floors_stacked:"Gestapelt",floor_rooms_one:"1 Raum",floor_rooms:"{n} R\xE4ume",quality:"Qualit\xE4t",quality_auto:"Auto",quality_low:"Tablet",quality_high:"Hoch",state_on:"An",state_off:"Aus",state_open:"Offen",state_closed:"Zu",state_opening:"\xD6ffnet",state_closing:"Schlie\xDFt",state_playing:"Spielt",state_paused:"Pause",state_idle:"Bereit",state_locked:"Verriegelt",state_unlocked:"Entriegelt",state_detected:"Erkannt",state_clear:"Frei",state_unavailable:"Nicht verf\xFCgbar",state_heat:"Heizen",state_cool:"K\xFChlen",state_auto:"Automatik",state_heat_cool:"Heizen/K\xFChlen",state_dry:"Entfeuchten",state_fan_only:"L\xFCften",devices:"Ger\xE4te",devices_none_area:"Verkn\xFCpfe den Raum mit einem Bereich, dann erscheinen dessen Ger\xE4te hier.",devices_none:"Im Bereich gibt es keine passenden Ger\xE4te.",devices_place_all_n:"Alle {n} platzieren \u2026",devices_place_all_confirm:"{n} Ger\xE4te auf einmal in den Raum setzen? (Strg+Z bzw. \u201ER\xFCckg\xE4ngig\u201C nimmt alle in einem Schritt zur\xFCck.)",devices_src_area:"Dieser Bereich",devices_src_other:"Andere Bereiche",devices_src_none:"Ohne Bereich",devices_place:"Platzieren",devices_remove:"Entfernen",devices_hint:"Platzierte Ger\xE4te erscheinen in 3D. Im Plan lassen sie sich verschieben.",panel_lights:"Licht",panel_covers:"Rolll\xE4den",panel_climate:"Heizung",panel_media:"Medien",panel_switches:"Schalter",panel_sensors:"Sensoren",panel_scenes:"Szenen & Skripte",panel_cameras:"Kameras",camera_live:"Livebild \xF6ffnen",through_camera:"Durch die Kamera schauen",through_blend:"\xDCberblendung",through_back:"Zur\xFCck zur Ansicht",camera_mount:"Montage",camera_mount_wall:"Wand (Blickrichtung = Drehung)",camera_mount_ceiling:"Decke (Dome, rundum)",camera_fov:"Sichtwinkel (\xB0)",camera_reach:"Reichweite (m)",camera_fov_short:"Winkel \xB0",camera_reach_short:"Reichweite m",camera_tilt:"Neigung nach unten (\xB0)",camera_tilt_short:"Neigung \xB0",camera_aim_hint:"Im Plan zeigt der Kegel, wohin die Kamera schaut. Der Griff an seiner Spitze dreht die Kamera und setzt die Reichweite.",state_recording:"Nimmt auf",state_streaming:"Streamt",panel_all_off:"Alle aus",panel_no_area:"Dieser Raum ist mit keinem Bereich verkn\xFCpft. Im Editor kannst du ihn verkn\xFCpfen.",panel_empty:"F\xFCr diesen Raum sind keine Ger\xE4te im Grundriss. Im Editor lassen sich Ger\xE4te platzieren oder mit \u2606 f\xFCrs Raumfenster ausw\xE4hlen.",close:"Schlie\xDFen",brightness:"Helligkeit",color_temp:"Farbtemperatur",color:"Farbe",position:"Position",cover_open:"Auf",cover_stop:"Stopp",cover_close:"Zu",target_temp:"Soll",current_temp:"Ist",temp_down:"K\xE4lter",temp_up:"W\xE4rmer",volume:"Lautst\xE4rke",play_pause:"Wiedergabe/Pause",previous:"Zur\xFCck",next:"Weiter",run:"Ausf\xFChren",details:"Details",hold_hint:"Antippen schaltet \xB7 lange dr\xFCcken \xF6ffnet Details",tool_opening:"T\xFCr & Fenster",tool_furniture:"M\xF6bel",qm_off:"Aus",find:"Suchen",find_placeholder:"Wo ist \u2026? Ger\xE4t oder Raum",find_none:"Nichts gefunden",swipe_off:"Aus",panel_pin:"Im Raumfenster zeigen",panel_unpin:"Nicht im Raumfenster zeigen",devices_panel_hint:"Das Raumfenster zeigt die Ger\xE4te im Grundriss. \u2606 nimmt ein Ger\xE4t zus\xE4tzlich ins Raumfenster auf, ohne es zu platzieren.",card_section_view:"Ansicht",card_size:"Gr\xF6\xDFe",card_size_fixed:"Feste H\xF6he",card_size_fill:"Bildschirm f\xFCllen",card_fill_hint:"Am besten in einer Dashboard-Ansicht vom Typ \u201EPanel (1 Karte)\u201C \u2013 dann nimmt die Karte den ganzen Platz ein.",card_controls:"Schalter in der Karte",card_floor_thumbs:"Etagen als Mini-Ansichten",card_floor_thumbs_hint:"Kleine Bilder der Etagen am Rand \u2013 antippen wechselt die Etage",card_floor_thumbs_hint_start:"Die gew\xE4hlte Etage ist dann die Start-Etage \u2013 mit den Bildern am Rand wechselt man zu den anderen",card_room_names:"Raumnamen anzeigen",card_section_kiosk:"Wandtablet (Kiosk)",card_section_features:"Funktionen",card_weather_plan:"wie im Plan eingestellt",card_pro_hint:"Bewegungsspur und Wetter sind Pro-Erweiterungen: ohne die passende Erweiterung bleiben die Schalter wirkungslos.",card_idle_return:"Zur\xFCck zur Startansicht nach",card_idle_off:"Nie",card_idle_min:"{n} min ohne Bedienung",card_idle_hint:"Nach der Wartezeit schlie\xDFt die Karte den Raum und zeigt wieder die Startansicht.",card_night:"Nachtdimmung",card_night_off:"Aus",card_night_sun:"Nach Sonnenstand",card_night_time:"Zeitraum",card_night_range:"Zeitraum (z. B. 22:00-06:00)",card_idle_orbit:"Kamerafahrt als Bildschirmschoner",card_idle_orbit_hint:"Nach der R\xFCckkehr dreht sich die Ansicht langsam, bis jemand das Tablet ber\xFChrt",card_alerts:"Warnungen anzeigen",card_alerts_hint:"Rauch, Gas, CO, Wasser, Alarmanlage und offene Fenster bei Regen: der Raum pulsiert, oben erscheint ein Hinweis",card_alert_jump:"Bei neuer Warnung zum Raum springen",card_alert_jump_hint:"Die Ansicht wechselt selbst zur Etage und zum Raum der Warnung",card_scenes:"Szenen-Kn\xF6pfe im Raum",card_scenes_hint:"Szenen und Skripte des Bereichs als Kn\xF6pfe unter der 3D-Ansicht, wenn ein Raum gew\xE4hlt ist",card_motion_trail:"Bewegungsspur",card_motion_trail_hint:"Wo in den letzten 30 Minuten Bewegung gemeldet wurde, mit Uhrzeit (Bewegungs-, Pr\xE4senz- und Kamerasensoren)",trail_short:"Spur",weather_short:"Wetter",weather_entity:"Wetter-Entit\xE4t",weather_effects:"Wetter-Effekte in 3D",weather_effect_rain:"Regen",weather_effect_snow:"Schnee",weather_effect_fog:"Nebel (graut die Szene ein)",weather_effect_clouds:"Wolken dunkeln Himmel und Sonne ab",weather_effect_lightning:"Blitze bei Gewitter",weather_effect_sky:"Sonne und Mond am Himmel",rain_warning:"Warnung: Fenster offen bei Regen",weather_entity_hint:"Die Wetter-Entit\xE4t liefert Regen, Schnee, Nebel und Wolken f\xFCr die 3D-Ansicht; \u201Eautomatisch\u201C nimmt die erste.",weather_hint:"Wetter drau\xDFen: Regen, Schnee, Nebel und Wolken aus der Wetter-Entit\xE4t, Sonne und Mond nach sun.sun",card_weather:"Wetter drau\xDFen",card_weather_hint:"Regen, Schnee, Nebel und Wolken aus der ersten Wetter-Entit\xE4t (weather_entity w\xE4hlt eine andere); auf Stufe Tablet nur die Bew\xF6lkung",trail_hint:"Bewegungsspur: wo in den letzten 30 Minuten Bewegung gemeldet wurde, mit Uhrzeit",alerts:"Warnungen",alert_smoke:"Rauch: {name}",alert_gas:"Gas: {name}",alert_co:"Kohlenmonoxid: {name}",alert_water:"Wasser: {name}",alert_alarm:"Alarm ausgel\xF6st",alert_alarm_pending:"Alarm wird ausgel\xF6st",alert_window_rain:"Fenster offen bei Regen: {name}",room_names_short:"Raumnamen",floor_stack_short_dim:"Abgedunkelt",floor_stack_short_stacked:"Gestapelt",floor_stack_short_single:"Einzeln",size_short_w:"B",size_short_d:"T",size_short_h:"H",import_error_not_json:"Die Datei ist kein JSON.",import_error_not_plan:"Die Datei ist kein Floorplan-3D-Plan.",export_name_template:"vorlage",export_name_backup:"sicherung",card_floor_stack:"Etagen darunter",floor_stack_dim:"Abgedunkelt",floor_stack_stacked:"Gestapelt (ganzes Haus bis hier)",floor_stack_single:"Ausgeblendet (nur diese Etage)",card_control_walls:"W\xE4nde hoch/Schnitt",card_control_floors:"Etagen auseinander",card_control_temperature:"Temperatur",card_control_humidity:"Feuchte",card_control_co2:"CO\u2082",card_controls_hint:"W\xE4nde hoch/Schnitt, Etagen auseinander und Temperatur, Feuchte, CO\u2082 zum Umschalten",card_fullscreen_button:"Vollbild-Taste",card_fullscreen_button_hint:"Blendet das Dashboard drumherum aus (z. B. am Wandtablet)",fullscreen:"Vollbild",fullscreen_exit:"Vollbild beenden",card_section_show:"Anzeigen",card_floor:"Etage",card_floor_house:"Ganzes Haus (Etage antippen zum \xD6ffnen)",card_height:"H\xF6he (Pixel)",card_walls:"W\xE4nde",card_quality_hint:"\u201ETablet\u201C ist die sparsamste Stufe \u2013 ideal f\xFCr Fire-Tablets und andere Wandtablets.",card_flows_switch:"Schalter in der Karte",card_flows_on:"Immer an",card_flows_off:"Immer aus",card_energy:"Energiewerte oben anzeigen",card_room_panel:"Raum-Details beim Antippen",card_room_panel_hint:"Lichter, Rolll\xE4den und Kameras des Raums in einem Seitenfenster",card_explode:"Etagen in der Hausansicht auseinanderziehen",card_stats:"Leistungsanzeige (Bilder pro Sekunde)",card_stats_hint:"Zum Pr\xFCfen, wie fl\xFCssig die Karte auf dem Ger\xE4t l\xE4uft",packs:"M\xF6bel-Packs",packs_hint:"Nur unterschriebene Packs des Herausgebers lassen sich importieren.",lib_badge_light:"Leuchte: l\xE4sst sich mit einem Licht verkn\xFCpfen und in 3D schalten",lib_badge_electric:"Elektrisch: l\xE4sst sich mit Entit\xE4t und Leistungssensor verkn\xFCpfen (schalten, Bild, Verbrauch)",lib_badge_hint:"M\xF6bel mit Symbol lassen sich mit Entit\xE4ten verkn\xFCpfen: Leuchten schalten, Bildschirme zeigen Bilder, Ger\xE4te ihren Verbrauch.",pack_error_wrong_instance:"Dieses Pack ist f\xFCr eine andere Home-Assistant-Installation signiert. Im Shop-Konto l\xE4sst es sich f\xFCr diese Installation neu laden.",license_title:"Shop-Verbindung",license_instance:"Installations-Kennung",license_copy:"Kopieren",license_copied:"Kennung kopiert",license_activate:"Aktivieren",license_activated:"Verbunden \u2013 die gekauften Packs stehen unten.",license_active:"Verbunden als {name} (Schl\xFCssel {key})",license_checked:"zuletzt gepr\xFCft {time}",license_refresh:"Jetzt pr\xFCfen",license_refreshed:"Gepr\xFCft.",license_remove:"Trennen",license_remove_confirm:"Shop-Verbindung trennen? Installierte Packs bleiben, nur Updates kommen nicht mehr von selbst.",license_installed:"installiert \xB7 v{release}",license_update_available:"Update auf v{release} verf\xFCgbar",license_not_installed:"noch nicht installiert",license_install:"Installieren",license_update:"Aktualisieren",license_none:"Noch keine Packs im Konto.",license_hint:"Den Lizenzschl\xFCssel findest du in der Bestellung und im Kundenkonto auf mastershort.de. Einmal eingetragen, erscheinen gekaufte Packs hier, werden f\xFCr diese Installation signiert und bekommen Updates von selbst (einmal t\xE4glich gepr\xFCft). Alles Installierte funktioniert auch ohne Verbindung.",license_shop:"Mehr Packs im Shop",license_error_invalid_key:"Diesen Schl\xFCssel kennt der Shop nicht. Er sieht so aus: NP-XXXX-XXXX-XXXX-XXXX.",license_error_activation_limit:"Dieser Schl\xFCssel ist schon mit der erlaubten Zahl von Installationen verbunden.",license_error_shop_unreachable:"Der Shop ist gerade nicht erreichbar. Installierte Packs funktionieren weiter.",license_error_not_owned:"Dieses Pack geh\xF6rt nicht zu diesem Konto.",license_error_no_key:"Zuerst den Lizenzschl\xFCssel eintragen.",license_error_wrong_instance:"Der Shop hat das Pack f\xFCr eine andere Installation signiert.",license_error_other:"Das hat nicht geklappt: {detail}",pack_import:"M\xF6bel-Packs importieren \u2026",pack_imported:"\u201E{name}\u201C von {publisher} importiert \u2013 {n} M\xF6bel",packs_imported_n:"{n} von {total} Packs importiert",pack_by:"von {publisher} \xB7 {n} M\xF6bel",pack_features:"von {publisher} \xB7 schaltet {n} Pro-Funktionen frei",pro_title:"NeonPlan Pro",pro_feature_camera_cockpit:"Kamera-Cockpit: durch die Kamera schauen und Bewegungsspur",pro_name_camera_cockpit:"Kamera-Cockpit",pro_name_weather:"Wetter drau\xDFen",pro_name_screens:"Bildschirme live",pro_name_energy_pro:"Energie Pro",ext_tab:"Erweiterungen",offers_title:"Neu im Shop",offers_new:"NEU",offers_loyalty:"Dein Treuerabatt: {percent} % auf jedes weitere Pack und jede Pro-Erweiterung",offers_kind_pack:"M\xF6bel-Pack",offers_kind_pro:"Pro-Erweiterung",offers_kind_bundle:"Bundle",offers_dot:"Neues im Shop",pack_updated:"{name} wurde auf Version {release} aktualisiert.",pack_updated_added:"{name} wurde auf Version {release} aktualisiert: {n} neue M\xF6bel \u2013 schau in die Bibliothek!",ext_title:"Erweiterungen",ext_intro:"M\xF6bel-Packs und Pro-Erweiterungen f\xFCr NeonPlan 3D. Gekaufte Erweiterungen installierst du hier mit deinem Lizenzschl\xFCssel; sie bekommen Updates von selbst und funktionieren auch ohne Verbindung.",ext_shop:"Shop \xF6ffnen",ext_pro:"Pro-Erweiterungen",ext_active:"aktiv",ext_get:"Im Shop ansehen",ext_open:"Erweiterungen \xF6ffnen",manual:"Anleitung",manual_more:"Mehr erfahren",ext_teaser_title:"Mehr M\xF6bel und Pro-Funktionen",ext_teaser_text:"M\xF6bel-Packs, Shop-Verbindung und Pro-Erweiterungen findest du oben unter \u201EErweiterungen\u201C.",pro_feature_weather:"Wetter drau\xDFen: Regen, Schnee, Wolken, Sonne und Mond",pro_feature_screens:"Bildschirme live: App-Farbe und Cover des Media Players, Bildregeln, Kamera-Livebild auf Bildschirmen",pro_feature_energy_pro:"Energie Pro: Stromfluss-Leitungen durchs Haus, lebende Solarmodule, Glas-Hologramm mit Energiebilanz \u2013 Gas, Wasser und W\xE4rme folgen als Update",pro_locked:"Diese Funktion ist eine Pro-Erweiterung. Nach dem Kauf erscheint sie unter Erweiterungen \u203A Shop-Verbindung und l\xE4sst sich dort installieren.",pro_shop:"Zum Shop",pack_licensed:"Lizenziert f\xFCr {name}",pack_remove:"Entfernen",pack_remove_confirm:"Pack \u201E{name}\u201C entfernen? M\xF6bel daraus bleiben als einfache K\xE4sten im Plan.",pack_missing_item:"M\xF6bel aus entferntem Pack",pack_error_bad_signature:"Das Pack wurde ver\xE4ndert oder seine Unterschrift ist ung\xFCltig.",pack_error_unknown_publisher:"Dieses Pack stammt nicht von einem bekannten Herausgeber.",pack_error_unsigned:"Das Pack ist nicht unterschrieben.",pack_error_not_a_pack:"Das ist keine M\xF6bel-Pack-Datei.",pack_error_invalid_content:"Das Pack enth\xE4lt ung\xFCltige M\xF6bel: {detail}",pack_error_too_large:"Die Datei ist zu gro\xDF.",pack_error_other:"Import fehlgeschlagen: {detail}",back_to_room:"Zur\xFCck zu {room}",back_to_floor:"Zur\xFCck zur Etage",hint_furniture:"Raum antippen, dann rechts ein M\xF6belst\xFCck w\xE4hlen \xB7 M\xF6bel ziehen, an den Ecken die Gr\xF6\xDFe \xE4ndern",furniture_into:"Neue M\xF6bel kommen in die Mitte von \u201E{room}\u201C.",furniture_pick_room:"Tipp: Erst einen Raum antippen \u2013 dann landen neue M\xF6bel in seiner Mitte.",flows:"Stromfluss",flows_hint:"Leuchtende Leitungen vom Z\xE4hler zu den Verbrauchern ein- oder ausblenden",holo_title:"Solar & Energie",holo_live:"live",holo_pv_now:"PV jetzt",holo_today:"Heute",holo_peak:"Spitze",holo_battery:"Akku",holo_grid:"Netz",holo_house:"Haus",holo_wallbox:"Wallbox",holo_autarky:"Autarkie",furn_name:"Name (optional)",cables_title:"Leitungen (Energie Pro)",cables_hint:"Gestrichelt: Die Leitung findet ihren Weg von selbst. Fass sie im Grundriss an oder w\xE4hle sie hier und dr\xFCcke \u201ESelbst verlegen\u201C: Dann l\xE4uft sie durchgezogen \xFCber deine Punkte in der eingestellten H\xF6he, zum Beispiel au\xDFen an der Fassade oder unter der Decke, und mehrere Leitungen lassen sich nebeneinander f\xFChren.",cable_laid:"selbst verlegt",cable_lay:"Selbst verlegen",cable_auto:"Wieder automatisch",cable_height:"H\xF6he \xFCber dem Boden (m)",cable_points_hint:"Punkte im Grundriss ziehen. Ein Klick auf die Leitung f\xFCgt einen Punkt ein, ein Doppelklick auf einen Punkt entfernt ihn.",cable_other_floor:"Diese Leitung ist auf der Etage {floor} verlegt: Wechsle dorthin, um ihre Punkte zu ziehen.",holo_settings:"Hologramm (Energie Pro)",holo_settings_hint:"Das Hologramm h\xE4ngt an einem Solarfeld und beh\xE4lt seine Gr\xF6\xDFe in der Welt: Beim Rauszoomen wird es kleiner. Hier stellst du Feld, Gr\xF6\xDFe und Versatz ein.",holo_field:"Am Solarfeld",holo_field_auto:"Automatisch (gr\xF6\xDFtes Feld)",holo_size:"Gr\xF6\xDFe (1 = normal)",holo_right:"Seitlich versetzt (m, + = rechts)",holo_up:"Nach oben versetzt (m, den Hang hinauf)",flow_on:"an",flow_off:"aus",hint_opening:"Auf eine Wand tippen, um eine T\xFCr oder ein Fenster einzusetzen \u2013 die Art w\xE4hlst du danach rechts",preset_door:"T\xFCr",preset_door_double:"Doppelt\xFCr",preset_window:"Fenster",preset_window_double:"Fenster 2-fl\xFCgelig",preset_terrace:"Terrassent\xFCr",preset_terrace_double:"Terrassent\xFCr 2-fl\xFCgelig",preset_garage:"Garagentor",preset_front:"Haust\xFCr",opening_style:"Stil",style_auto:"Automatisch ({style})",style_interior:"Zimmert\xFCr",style_front:"Haust\xFCr",style_front_glass:"Haust\xFCr mit Glasausschnitt",style_sidelight:"Haust\xFCr mit Seitenteil",style_sidelights:"Haust\xFCr mit 2 Seitenteilen",style_glass:"Glast\xFCr",style_sliding:"Schiebet\xFCr",style_passage:"Durchbruch (ohne T\xFCr)",style_standard:"Standard",style_bars:"Mit Sprossen",flip_hinge:"Anschlag wechseln",flip_main_leaf:"Hauptfl\xFCgel wechseln",flip_hinge_hint:"Scharniere auf die andere Seite",flip_swing:"\xD6ffnungsrichtung umdrehen",flip_swing_hint:"Die T\xFCr schwenkt in den Raum oder zur anderen Seite",main_leaf:"Hauptfl\xFCgel (vom Raum aus)",contact_main:"Kontakt Hauptfl\xFCgel",contact_second:"Kontakt zweiter Fl\xFCgel",tool_outdoor:"Au\xDFen",tool_measure:"Nach Ma\xDF",hint_measure:"Startpunkt antippen, dann rechts die Wandl\xE4ngen mit Richtung eingeben",measure:"Raum nach Ma\xDF",measure_start:"Tippe im Plan auf den Startpunkt, z. B. eine Raumecke.",measure_from:"Start bei {x} / {z} m \u2013 antippen verschiebt den Start.",measure_length:"L\xE4nge der n\xE4chsten Wand (m)",measure_close:"Raum schlie\xDFen",measure_undo:"Letzte Wand weg",measure_gap:"L\xFCcke zum Start: {gap} m (wird beim Schlie\xDFen verbunden)",measure_hint:"Tipp: L\xE4nge eintippen und Pfeiltaste dr\xFCcken. Mit gemessenen Innenma\xDFen danach \u201EL\xFCcken schlie\xDFen\u201C.",rect_by_size:"Rechteck nach Ma\xDF",rect_add:"Rechteck anlegen",dir_up:"Nach oben",dir_down:"Nach unten",dir_left:"Nach links",dir_right:"Nach rechts",hint_outdoor:"Ziehen, um eine Au\xDFenfl\xE4che (Rasen, Terrasse, Pool \u2026) aufzuziehen",outdoor:"Au\xDFenfl\xE4che",outdoor_type:"Art",outdoor_hint:"Au\xDFenleuchten (Wegleuchte, Garten-Spot, Wandleuchte au\xDFen) beleuchten alle Au\xDFenfl\xE4chen und die Fassade.",out_lawn:"Rasen",out_terrace:"Terrasse",out_path:"Weg",out_driveway:"Einfahrt",out_pool:"Pool",out_bed:"Beet",out_hedge:"Hecke",out_fence:"Zaun",north:"Nordrichtung (\xB0 im Uhrzeigersinn von oben)",north_hint:"Die Nordrichtung braucht der Sonnenstand (Licht durch die Fenster).",roof:"Dach",roof_none:"Kein Dach",roof_flat:"Flachdach",roof_gable:"Satteldach",roof_custom:"Dachfl\xE4chen (frei)",roof_sections:"Dachfl\xE4chen",roof_sections_hint:"Jede Dachfl\xE4che deckt ein Rechteck des Hauses ab, etwa das Wohnhaus, die Scheune oder einen Anbau \u2013 jede mit eigener Form, Firstrichtung, Traufh\xF6he und Neigung. Eine neue Fl\xE4che ziehst du im Plan auf; antippen w\xE4hlt sie aus, ziehen verschiebt sie, die Ecken \xE4ndern die Gr\xF6\xDFe.",roof_sections_start:"Dachfl\xE4chen aus den R\xE4umen erzeugen",roof_sections_regen:"Neu aus den R\xE4umen erzeugen",roof_sections_off:"Zur\xFCck zu einem Dach",roof_regen_confirm:"Alle Dachfl\xE4chen durch einen neuen Vorschlag aus den R\xE4umen ersetzen?",roof_section:"Dachfl\xE4che",roof_section_hint:"H\xF6hen z\xE4hlen vom Boden. Eine Seite mit tieferer Traufe zieht weiter herunter (Abschleppdach); Pultd\xE4cher steigen von der ersten Seite an.",roof_shape_gable:"Sattel",roof_shape_hip:"Walm",roof_shape_pent:"Pult",roof_shape_flat:"Flach",roof_axis_x:"First \u2194",roof_axis_z:"First \u2195",roof_eave:"Traufe (m)",roof_pitch_short:"Neigung (\xB0)",roof_height:"H\xF6he (m)",roof_base:"Wandoberkante (m)",roof_ridge_height:"Firsth\xF6he",roof_side_top:"oben",roof_side_bottom:"unten",roof_side_left:"links",roof_side_right:"rechts",roof_swap:"Seiten tauschen",roof_open:"\xDCberdachung (Pfosten statt W\xE4nde, durchsichtig)",roof_open_short:"\xDCberdachung",roof_open_hint:"F\xFCr Terrassendach oder Carport: Statt W\xE4nden tragen Pfosten und Balken das Dach, die Fl\xE4che ist durchsichtig. Wo die \xDCberdachung an die Hauswand st\xF6\xDFt, liegt sie auf der Wand auf.",roof_swap_hint:"Dreht das Dach um: Die beiden Seiten tauschen Traufe und Neigung, ein Pultdach steigt in die andere Richtung.",roof_pitch:"Dachneigung (\xB0)",roof_overhang:"Dach\xFCberstand (m)",roof_ridge:"First",roof_ridge_long:"Entlang der langen Seite",roof_ridge_short:"Entlang der kurzen Seite (z. B. Reihenhaus)",device:"Ger\xE4t",lamp_mount:"Lampe",lamp_ceiling:"Deckenleuchte",lamp_floor:"Stehlampe",lamp_table:"Tischlampe",lamp_wall:"Wandleuchte",marker_height:"H\xF6he des Symbols (m)",height_auto:"H\xF6he automatisch",device_centre:"In Raummitte",lights_spread:"Deckenlampen gleichm\xE4\xDFig verteilen",devices_search:"Ger\xE4te suchen \u2026",devices_more:"+{n} weitere",devices_less:"weniger",panel_more:"Weitere Ger\xE4te des Bereichs ({n})",panel_less:"Weniger anzeigen",gaps_close:"L\xFCcken schlie\xDFen",gaps_hint:"R\xE4ume mit bis zu 60 cm Abstand an einer gemeinsamen Wand zusammenf\xFChren; der Abstand wird die Innenwandst\xE4rke.",gaps_none:"Keine L\xFCcken zwischen R\xE4umen gefunden.",gaps_closed:"{n} Stellen geschlossen.",gaps_closed_wall:"{n} Stellen geschlossen, Innenwand jetzt {t} m.",fps:"FPS",fps_title:"Leistungsanzeige (Bilder pro Sekunde)",hint_garage:"Auf eine Wand tippen, um ein Garagentor einzusetzen",opening_garage:"Garagentor",garage_hint:"Das Tor folgt einem Garagen-Cover (Position oder offen/zu) oder einem Garagentor-Kontakt aus dem Bereich des Raums.",door_hint:"Mit T\xFCrkontakt schwenkt das T\xFCrblatt auf, ohne Sensor steht es halb offen.",hint_door:"Auf eine Wand tippen, um eine T\xFCr einzusetzen",hint_window:"Auf eine Wand tippen, um ein Fenster einzusetzen",opening_door:"T\xFCr",opening_window:"Fenster",opening_type:"Art",opening_position:"Mitte ab Ecke (m)",sill:"Br\xFCstung (m)",opening_height:"H\xF6he (m)",hinge:"Anschlag (vom Raum aus)",hinge_left:"Links",hinge_right:"Rechts",cover_entity:"Rollladen",cover_position_entity:"Positions-Sensor (live)",cover_position_invert:"Sensor z\xE4hlt umgekehrt (0 = offen)",contact_entity:"Kontakt",sensor_kind:"Sensor-Art",sensor_kind_contact:"Fensterkontakt (offen/zu)",sensor_kind_handle:"Griff-Sensor (offen/gekippt/zu)",sensor_kind_contact_tilt:"Kontakt + Kipp-Sensor",handle_entity:"Griff-Sensor",handle_main:"Griff-Sensor Hauptfl\xFCgel",leaf_main:"Hauptfl\xFCgel",leaf_second:"Zweiter Fl\xFCgel",tilt_entity:"Kipp-Sensor",entity_auto:"Automatisch ({name})",entity_auto_none:"Automatisch (keiner gefunden)",entity_none:"Keiner",entity_search:"Tippen zum Suchen \u2026",opening_hint:"Sensor-Art: Fensterkontakt (meldet offen/zu), Griff-Sensor (meldet offen, gekippt und zu \u2013 z. B. Homematic-Fenstergriff) oder Kontakt + Kipp-Sensor (ein zweiter Sensor, der nur \u201Egekippt\u201C meldet). Automatisch nimmt Rolll\xE4den und Kontakte aus dem Bereich des Raums. Positions-Sensor: eine Entit\xE4t, die die Rollladen-Position auch w\xE4hrend der Fahrt meldet (z. B. Homematic \u201ELevel\u201C, 0\u2013100 % oder 0\u20131, offen = hoch) \u2013 dann f\xE4hrt der Rollladen in 3D live.",furniture:"M\xF6bel",furniture_add:"M\xF6bel hinzuf\xFCgen",furniture_search:"M\xF6bel suchen \u2026",furniture_type:"M\xF6belst\xFCck",rotation:"Drehung (\xB0)",rotate_left:"\u21BA 90\xB0",rotate_right:"\u21BB 90\xB0",height_m:"H\xF6he (m)",furn_sofa:"Sofa",furn_armchair:"Sessel",furn_table:"Tisch",furn_chair:"Stuhl",furn_bed:"Bett",furn_nightstand:"Nachttisch",furn_wardrobe:"Schrank",furn_shelf:"Regal",furn_kitchen:"K\xFCchenzeile",furn_worktop:"Arbeitsplatte",furn_fridge:"K\xFChlschrank",furn_fridge_smart:"Smart-K\xFChlschrank (Side-by-Side)",furn_door_left:"T\xFCrsensor links (Gefrierseite)",furn_door_right:"T\xFCrsensor rechts (K\xFChlseite)",fridge_hint:"Meldet ein T\xFCrsensor \u201Eoffen\u201C, schwingt die T\xFCr in 3D auf. Der Bildschirm auf der rechten T\xFCr zeigt Bilder nach Regeln wie ein Fernseher \u2013 solange die T\xFCr zu ist.",furn_stove:"Herd",furn_sink:"Sp\xFCle",furn_bathtub:"Badewanne",furn_shower:"Dusche",furn_wc:"WC",furn_washbasin:"Waschtisch",furn_desk:"Schreibtisch",furn_tv_board:"TV-Board",furn_plant:"Pflanze",furn_rug:"Teppich",furn_stairs:"Treppe",furn_stairwell:"Boden\xF6ffnung",stairwell_hint:"Ein Loch im Boden dieser Etage, zum Beispiel \xFCber dem Treppenaufgang oder f\xFCr eine Galerie; von oben sieht man hindurch. Die \xD6ffnung muss ganz in einem Raum liegen; mehrere \xD6ffnungen d\xFCrfen sich \xFCberlappen (zum Beispiel f\xFCr eine L-Form). Eine Treppe auf der Etage darunter, die bis hier hinauf reicht, \xF6ffnet den Boden auch von selbst.",tool_hole:"Boden\xF6ffnung",tool_roof:"Dach",tool_energy:"Energie",tool_wall:"Wand",hint_wall:"Ziehen, um eine einzelne Wand zu zeichnen (Raumteiler, halbe Wand) \xB7 Umschalt h\xE4lt sie gerade \xB7 Alt ohne Fangen",free_wall:"Wand",wall_length:"L\xE4nge (m)",wall_thickness:"Wandst\xE4rke (m)",wall_height:"H\xF6he (m)",wall_height_full:"Volle Raumh\xF6he",wall_heights:"Wandh\xF6hen",wall_n:"Wand {a}\u2013{b}",wall_exterior_short:"Au\xDFenwand",room_wall_hint:"Eine niedrigere H\xF6he macht aus der Wand eine Br\xFCstung oder Theke. Teilen sich zwei R\xE4ume die Wand, gilt die niedrigere Einstellung. Fenster und T\xFCren darin enden an der Wandh\xF6he.",free_wall_hint:"Eine frei stehende Wand, zum Beispiel ein Raumteiler. Trifft sie auf eine Raumwand, wird die Ecke verschnitten. Die Endpunkte ziehst du an den Griffen, die ganze Wand verschiebst du an der Linie.",stairwell_outside:"Diese \xD6ffnung ragt \xFCber eine Raumgrenze und wird deshalb nicht ausgeschnitten. Ziehe sie ganz in einen Raum oder verkleinere sie.",hint_hole:"Ziehen, um eine Boden\xF6ffnung aufzuziehen (Treppenaufgang, Galerie)",hint_roof:"Dachfl\xE4che aufziehen \xB7 antippen w\xE4hlt aus \xB7 ziehen verschiebt \xB7 Ecken \xE4ndern die Gr\xF6\xDFe",hint_energy:"Solarfeld antippen w\xE4hlt aus \xB7 ziehen verschiebt, auch auf eine andere Dachfl\xE4che \xB7 neue Felder rechts mit + Solarfeld",furn_parking:"Stellplatz",furn_group_vehicles:"Stellpl\xE4tze",parking_entity:"Sensor \u201EAuto anwesend\u201C",parking_vehicle:"Fahrzeug",parking_vehicle_none:"Keins",parking_no_pack:"Kein Fahrzeug-Pack importiert \u2013 Fahrzeuge kommen aus dem Pack \u201EFahrzeuge\u201C (M\xF6bel \u2192 M\xF6bel-Pack importieren).",parking_scale:"Gr\xF6\xDFe (%)",parking_type_entity:"Fahrzeugtyp-Sensor (optional)",parking_types:"Zustand \u2192 Fahrzeug",parking_type_state:"Zustand (z. B. van)",parking_add_type:"+ Zuordnung",parking_hint:"Ohne Sensor steht das Fahrzeug immer da. Mit Sensor erscheint es, sobald der Sensor \u201Ean\u201C, \u201Ehome\u201C oder \u201Eanwesend\u201C meldet. Ein Fahrzeugtyp-Sensor (z. B. aus einer KI-Kameraauswertung) w\xE4hlt das Modell: Passt sein Zustand zu einer Zuordnung \u2013 auch als Wort im Text \u2013, wird dieses Fahrzeug gezeigt, sonst das Standard-Fahrzeug.",parking_too_tall:"Das Fahrzeug ({car} m) ist h\xF6her als der Raum ({room} m).",furn_lamp_ceiling:"Deckenleuchte",furn_lamp_downlight:"Einbauspot",furn_lamp_spot:"Aufbau-Spot",furn_lamp_panel:"LED-Panel",furn_lamp_uplight:"Deckenfluter",furn_lamp_bollard:"Wegleuchte",furn_lamp_garden:"Garten-Spot",furn_radiator:"Heizk\xF6rper",furn_robot_vacuum:"Saugroboter",furn_entity_vacuum:"Saugroboter",furn_robot_room:"Aktueller Raum (Sensor)",robot_hint:"Saugt der Roboter in Home Assistant, f\xE4hrt er in 3D in Bahnen durch den Raum, den er meldet (Sensor \u201EAktueller Raum\u201C, zugeordnet \xFCber den Raum- oder Bereichsnamen), sonst durch den Raum seiner Station. Die Fahrspur ist simuliert \u2013 Home Assistant kennt meist nicht die genaue Position. Zur\xFCck f\xE4hrt er zur Station.",furn_lamp_pendant:"Pendelleuchte",furn_lamp_floor:"Stehlampe",furn_lamp_table:"Tischlampe",furn_lamp_wall:"Wandleuchte",furn_led_strip:"LED-Streifen",furn_group_lights:"Leuchten",furn_entity_light:"Licht oder Schalter",furn_entity_climate:"Heizung (Thermostat)",lamp_hint:"Antippen in 3D schaltet die Leuchte, lange dr\xFCcken \xF6ffnet das Schnellmen\xFC. Auch Schalter (z. B. ein Relais f\xFCrs Deckenlicht) sind m\xF6glich \u2013 die Leuchte strahlt dann, solange er an ist. Tischlampen stehen automatisch auf dem M\xF6bel darunter.",lamp_hint_pendant:"H\xF6he = Abh\xE4ngung unter der Decke. Antippen in 3D schaltet, lange dr\xFCcken \xF6ffnet die Details.",theme:"Look",theme_neon:"Neon",theme_blueprint:"Blueprint",theme_day:"Tag",furnish:"Einrichten",split_3d:"3D daneben",mount_height:"H\xF6he \xFCber Boden (m)",side_open:"Seitenleiste \xF6ffnen",side_close:"Schlie\xDFen",side_details:"Details zur Auswahl",side_pin:"Anheften",side_pinned:"Angeheftet",side_pin_hint:"Angeheftet bleibt die Seitenleiste immer offen; sonst klappt sie neben der 3D-Ansicht zu, solange nichts ausgew\xE4hlt ist",split_3d_hint:"Live-3D neben dem Plan: M\xF6bel und Ger\xE4te dort ziehen und drehen \u2013 mit R\xFCckg\xE4ngig, gespeichert wird mit dem Plan",size_w:"Breite (m)",size_d:"Tiefe (m)",size_h:"H\xF6he (m)",furnish_hint:"M\xF6bel, Leuchten und Ger\xE4te mit dem Finger ziehen \xB7 M\xF6bel rasten an W\xE4nden ein \xB7 antippen zum Drehen, f\xFCr H\xF6he und Montage",done:"Fertig",heatmap:"Heatmap",heat_off:"Normal",heat_short_temperature:"Temp.",heat_short_humidity:"Feuchte",heat_short_co2:"CO\u2082",heat_temperature:"Temperatur",heat_humidity:"Luftfeuchtigkeit",heat_co2:"CO\u2082",heat_none_found:"Keine passenden Sensoren in den Bereichen der R\xE4ume.",markers:"Symbole",markers_none:"Keine",markers_important:"Wichtige",markers_all:"Alle",furn_stool:"Hocker",furn_coffee_table:"Couchtisch",furn_tv_wall:"Fernseher (Wand)",furn_sideboard:"Sideboard",furn_table_round:"Runder Tisch",furn_bench:"Sitzbank",furn_corner_bench:"Eckbank",furn_bar_stool:"Barhocker",furn_kitchen_wall:"Oberschrank",furn_kitchen_tall:"Hochschrank mit Backofen",furn_island:"Kochinsel",furn_dishwasher:"Sp\xFClmaschine",furn_bunk_bed:"Etagenbett",furn_dresser:"Kommode",furn_washer:"Waschmaschine",furn_dryer:"Trockner",furn_office_chair:"B\xFCrostuhl",furn_tall_cabinet:"Hochschrank",furn_coat_rack:"Garderobe",furn_group_living:"Wohnen",furn_group_dining:"Essen",furn_group_kitchen:"K\xFCche",furn_group_sleeping:"Schlafen",furn_group_bath:"Bad & Hauswirtschaft",furn_group_work:"Arbeiten & Sonstiges",furn_group_energy:"Energie & Solar",energy_devices:"Ger\xE4te",solar_pro_title:"Solar & Energie Pro",solar_pro_soon:"bald verf\xFCgbar",solar_pro_1:"Module, die bei Sonne leben und mit der Leistung leuchten",solar_pro_2:"Feine Stromfluss-Leitungen durchs Haus: woher der Strom gerade kommt und wohin er flie\xDFt",solar_pro_3:"Ein Hologramm aus Glas mit Leistung, Tageskurve, Ertrag heute und Autarkie",solar_pro_4:"Werte je Strang auf dem Dach, Akku, Wallbox und Netz auf einen Blick",solar_pro_free:"Alles, was du hier einrichtest (Felder, Str\xE4nge, Ger\xE4te, Sensoren), bleibt kostenlos und wird von der Pro-Erweiterung direkt genutzt.",wallbox_charging:"l\xE4dt",wallbox_plugged:"angesteckt",furn_soc:"Ladestand (%)",furn_wallbox_status:"Status (l\xE4dt, angesteckt)",energy_only_note:"\u26A1 Energie: Hier lassen sich nur Solarfelder und Energieger\xE4te verschieben, R\xE4ume und M\xF6bel sind gesperrt.",roof_only_note:"\u{1F3E0} Dach: Hier lassen sich nur Dachfl\xE4chen und Dachfenster verschieben, R\xE4ume und M\xF6bel sind gesperrt.",energy_devices_hint:"Stromz\xE4hler, Wechselrichter, Stromspeicher, Wallbox und Netzanschluss werden hier angelegt: auf der oben gew\xE4hlten Etage, im Grundriss verschiebbar. Mit Leistungssensor zeigen sie ihre Watt; der Z\xE4hler bekommt den Netzsensor, beim Strang w\xE4hlst du den Wechselrichter. Mehrere Wechselrichter und Speicher (etwa eine Balkonanlage dazu) gehen auch: Jeder bekommt seinen eigenen Sensor.",solar_fields:"Solarfelder",solar_hint:"Module aufs Dach legen: Sie liegen in der Neigung der Dachfl\xE4che, auf einem Flachdach stehen sie aufgest\xE4ndert. Im Grundriss l\xE4sst sich ein Feld mit der Maus verschieben.",solar_no_roof:"F\xFCr Solarfelder braucht das Haus ein Dach: unter Einstellungen ein Sattel- oder Flachdach, oder Dachabschnitte hier im Dach-Werkzeug.",solar_face_gone:"Dachfl\xE4che fehlt",solar_summary:"{n} Module \xB7 {kwp} kWp",solar_add:"Solarfeld",solar_field:"Solarfeld",solar_face:"Dachfl\xE4che",solar_rows:"Reihen",solar_cols:"Module pro Reihe",solar_portrait:"Hochformat",solar_landscape:"Querformat",solar_u:"Abstand vom Rand (m)",solar_v:"Abstand von der Traufe (m)",solar_tilt:"Neigung der Aufst\xE4nderung (\xB0)",solar_flip:"In die andere Richtung neigen",solar_partial:"nur {n} von {total} passen auf die Fl\xE4che",solar_form_hint:"Module, die \xFCber die Dachfl\xE4che hinausragen w\xFCrden, fallen weg. \u201EFl\xE4che f\xFCllen\u201C legt so viele Module aufs Dach, wie passen. kWp gerechnet mit 400 W je Modul.",solar_fit:"Fl\xE4che f\xFCllen",roof_windows:"Dachfenster",roof_window:"Dachfenster",roof_windows_hint:"Dachfenster liegen in der Dachfl\xE4che, mit Rollladen und Kontakt wie normale Fenster. Im Grundriss lassen sie sich verschieben, auch auf eine andere Dachfl\xE4che.",roof_window_tilt:"Kippkontakt",roof_window_hint:"Offen klappt der Fl\xFCgel oben angeschlagen nach au\xDFen, gekippt ein St\xFCck; der Rollladen f\xE4hrt von oben \xFCber die Scheibe.",solar_ground:"Frei aufgest\xE4ndert (Garten, Garagendach \u2026)",solar_add_ground:"Frei aufgest\xE4ndert",solar_base:"H\xF6he der Aufstellfl\xE4che (m, 0 = Boden)",solar_add_wall:"An der Wand",solar_wall:"Wand",solar_v_wall:"H\xF6he \xFCber dem Boden (m)",solar_tilt_wall:"Neigung von der Wand (\xB0, 90 = Vordach)",solar_flip_wall:"Unten abstehend statt oben",solar_rotation:"Drehung (\xB0)",solar_name:"Name",solar_name_hint:"z. B. Strang 1 S\xFCd",solar_module_w:"Modulbreite (m)",solar_module_h:"Modulh\xF6he (m)",solar_string:"Strang",solar_strings:"Str\xE4nge",solar_string_none:"Kein Strang",solar_string_new:"Neuer Strang",solar_string_n:"Strang {n}",solar_string_name:"Name des Strangs",solar_string_entity:"PV-Leistung des Strangs",solar_string_inverter:"Wechselrichter",solar_string_inverter_none:"Kein Wechselrichter gew\xE4hlt",solar_string_inverter_missing:"Noch kein Wechselrichter im Plan (unten bei Ger\xE4te anlegen)",solar_string_hint:"Felder im selben Strang geh\xF6ren zusammen, auch auf verschiedenen D\xE4chern (z. B. 5 Module auf dem Haus und 5 auf der Garage). Sensor und Wechselrichter gelten f\xFCr den ganzen Strang.",solar_string_sum:"{fields} Felder \xB7 {n} Module \xB7 {kwp} kWp",solar_face_size:"Dachfl\xE4che {w} \xD7 {h} m (entlang der Traufe \xD7 die Schr\xE4ge hoch)",solar_cols_hint:"Eine Zahl f\xFCr gleich lange Reihen, oder eine Liste f\xFCr Reihen eigener L\xE4nge: \u201E4, 4, 3\u201C (von der Traufe aus).",solar_align_left:"Links",solar_align_center:"Mitte",solar_align_right:"Rechts",solar_look_black:"Full Black",solar_look_blue:"Blau",solar_pick:"Module einzeln an/aus",solar_pick_all:"Alle wieder an",solar_pick_hint:"Tippe im Grundriss auf ein Modul, um es wegzunehmen oder wieder dazuzunehmen. Weggenommene sind gestrichelt.",solar_entity:"PV-Leistung dieses Feldes (z. B. sein Strang)",solar_main:"Hauptdach",solar_section:"Abschnitt {n}",solar_flat:"Flachdach",compass_n:"Nord",compass_ne:"Nordost",compass_e:"Ost",compass_se:"S\xFCdost",compass_s:"S\xFCd",compass_sw:"S\xFCdwest",compass_w:"West",compass_nw:"Nordwest",furn_meter:"Stromz\xE4hler",furn_grid_point:"Netzanschluss",grid_point_hint:"Hier endet die Netzleitung: am \xDCbergabepunkt zum Stromanbieter, zum Beispiel am Ende der Einfahrt. Im Grundriss verschiebbar; ohne Netzanschluss endet die Leitung am Rand der Au\xDFenfl\xE4chen.",furn_model:"Modell",inverter_std:"Standard (Wandger\xE4t mit Display)",inverter_slim:"Schmal und hoch (Lichtleiste)",inverter_hybrid:"Hybrid (Rund-Display, L\xFCfter)",battery_std:"Turm (gestapelte Module)",battery_wall:"Wandspeicher (flach, h\xE4ngend)",battery_cube:"Kompakt (Balkonspeicher)",furn_inverter:"Wechselrichter",furn_home_battery:"Stromspeicher",furn_wallbox:"Wallbox",furn_entity:"Ger\xE4t (Schalter, Steckdose \u2026)",furn_entity_tv:"Fernseher (Media-Player oder Steckdose)",fix:"Fixieren",unfix:"L\xF6sen",fix_hint:"Fixiert: l\xE4sst sich nicht mehr versehentlich verschieben (Taste L, Rechtsklick oder langes Dr\xFCcken)",fixed_drag_hint:"\u{1F512} Fixiert \u2013 zum Verschieben erst l\xF6sen (Schloss im Formular, Rechtsklick oder Taste L)",fixed_delete_confirm:"Dieses Element ist fixiert. Trotzdem l\xF6schen?",lock_plan:"\u{1F512} Grundriss",lock_plan_hint:"Grundriss sperren: R\xE4ume, W\xE4nde, T\xFCren, Fenster und Au\xDFenfl\xE4chen lassen sich nicht mehr versehentlich verschieben. M\xF6bel und Ger\xE4te bleiben frei.",ctx_rotate:"Drehen 90\xB0",devices_placed_in:"in {room}",devices_narrow:"{n} weitere \u2013 Suche eingrenzen",climate:"Raumklima",climate_temperature:"Temperatur",climate_humidity:"Luftfeuchte",climate_co2:"CO\u2082",climate_hint:"Diese Sensoren gelten f\xFCr die Heatmap und das Raumfenster. \u201EAutomatisch\u201C nimmt die Sensoren des Bereichs und die im Raum platzierten, aber keine Ger\xE4tetemperaturen (3D-Drucker, W\xE4rmepumpe, Vorlauf \u2026).",plan_locked:"Grundriss gesperrt",plan_lock:"Grundriss sperren",plan_unlock:"Grundriss entsperren",opening_mark:"Markieren in 3D",opening_mark_open:"Wenn offen",opening_mark_closed:"Wenn geschlossen (z. B. WC)",opening_mark_hint:"Ein markiertes Fenster oder eine markierte T\xFCr leuchtet warm. \u201EWenn geschlossen\u201C braucht einen Kontakt; ohne Sensor wird nichts markiert.",marker_show:"Symbol in 3D",marker_show_hint:"Automatisch folgt dem Schalter Keine / Wichtige / Alle in der 3D-Ansicht. Immer zeigen und Ausblenden gelten unabh\xE4ngig davon (au\xDFer bei Keine).",marker_show_auto:"Automatisch",marker_show_always:"Immer zeigen",marker_show_no_power:"Ohne Watt",marker_show_never:"Ausblenden",furn_power:"Leistungssensor (W)",furn_links_hint:"Mit Leistungssensor zeigt das M\xF6bel seine Watt und bekommt eine Energie-Leitung.",screen_pictures:"Bilder nach Zustand",screen_pictures_hint:"Verglichen wird der Zustand oder ein Attribut der Entit\xE4t (z. B. app_name eines Fernsehers). Der Wert passt, wenn er gleich ist oder im Text vorkommt (\u201Eyoutube\u201C passt zu \u201Ecom.google.android.youtube.tv\u201C); \u201E*\u201C = immer. Die erste passende Regel gewinnt. Bilder werden auf 512 px verkleinert gespeichert; alternativ eine Bild-URL oder eine Kamera \u2013 deren Livebild wird alle 5 Sekunden erneuert, solange es gezeigt wird. Ohne passende Regel zeigt der Bildschirm den Media Player.",picture_state:"ist oder enth\xE4lt \u2026 (z. B. netflix)",picture_state_of:"Zustand",picture_attribute:"Zustand oder Attribut vergleichen",picture_pick:"Bild w\xE4hlen \u2026",picture_change:"Bild \xE4ndern \u2026",picture_url:"oder Bild-URL",picture_add_value:"+ Wert",picture_reuse:"Vorhandenes Bild verwenden",picture_camera:"oder Kamera (Livebild) \u2026",picture_camera_none:"Keine Kamera",screen_bg:"Bildschirm hinter dem Bild",screen_bg_black:"Dunkel",screen_bg_white:"Wei\xDF",picture_add_entity:"+ Weitere Entit\xE4t",picture_current:"aktuell: {value}",picture_matches:"\u2713 passt gerade \u2013 dieses Bild wird gezeigt",furn_links_hint_tv:"Der Bildschirm leuchtet, solange der Fernseher an ist, in der Farbe der App (Netflix, YouTube \u2026); das Schild zeigt App oder Titel.",stairs_hint:"Die Treppe steigt nach hinten an (weg von der markierten Vorderkante) und \xF6ffnet die Decke der Etage dar\xFCber.",floor_lights:"{n} Licht an",floor_open:"{n} offen",floor_persons:"{n} Pers.",energy_consumption:"Verbrauch",energy_grid_import:"Netzbezug",energy_grid_export:"Einspeisung",energy_solar:"Solar",energy_battery:"Akku",energy_tariff:"Tarif",energy:"Energie",energy_meter:"Z\xE4hlerplatz",energy_grid:"Netz (W, + = Bezug)",energy_solar_sensor:"Solar-Erzeugung (W)",energy_battery_sensor:"Akku-Leistung (W, + = Entladen)",energy_battery_soc:"Akku-Ladestand (%)",energy_tariff_sensor:"Tarif (z. B. \u20AC/kWh)",energy_invert:"Vorzeichen umkehren",energy_hint:"Verbraucher sind platzierte Ger\xE4te mit Leistungssensor (W) \u2013 der Sensor selbst oder einer vom selben Ger\xE4t.",energy_balance:"Energiebilanz",energy_balance_hint:"Netz, Solar und Akku kommen von den Ger\xE4ten im Plan: Stromz\xE4hler, Wechselrichter und Stromspeicher. Hier kannst du andere Sensoren w\xE4hlen, Vorzeichen umkehren und den Hausverbrauch angeben.",energy_consumption_sensor:"Hausverbrauch (W, sonst aus der Bilanz)",energy_import_prefs:"Aus dem Energie-Dashboard \xFCbernehmen",energy_import_done:"{n} Sensoren \xFCbernommen \u2013 bitte die Vorzeichen pr\xFCfen.",energy_import_none:"Im Energie-Dashboard sind keine passenden Leistungssensoren (W) zu finden \u2013 bitte von Hand w\xE4hlen.",energy_import_failed:"Das Energie-Dashboard von Home Assistant ist nicht eingerichtet.",tool_meter:"Z\xE4hler",hint_meter:"Auf die Stelle des Z\xE4hlers tippen",presence:"Anwesenheit",presence_hint:"Raumsensor je Person (z. B. ESPresense, Bermuda): sein Zustand nennt den Raum oder Bereich.",presence_sensor:"Raumsensor",no_persons:"In Home Assistant gibt es keine Personen."},Eo={view:"3D",editor:"Editor",all_floors:"All floors",no_building:"No floor plan yet.",no_building_admin:"No floor plan yet. Draw your first floor in the editor.",open_editor:"Open editor",loading:"Loading \u2026",load_error:"Loading failed",saving:"Saving \u2026",saved:"Saved",save_error:"Saving failed",save_failed_detail:"Saving failed: {error}. Your changes are kept in this browser.",needs_restart:"A new version of NeonPlan 3D is installed, but Home Assistant still runs {version}. Please restart Home Assistant \u2013 until then saving may fail.",needs_restart_old:"A new version of NeonPlan 3D is installed, but Home Assistant still runs an older one. Please restart Home Assistant \u2013 until then saving fails.",draft_found:"Unsaved changes from {time} found.",draft_restore:"Restore and save",draft_discard:"Discard",walls_auto:"Tall walls",walls_cut:"Cut",reset_view:"Overview",back:"Back",floor:"Floor",floors:"Floors",add_floor:"Add floor",floor_from_ha:"Floors from Home Assistant:",floor_empty:"Empty floor",level:"Level {n}",ha_floor:"Floor in Home Assistant",no_ha_floor:"\u2013 none \u2013",area_rooms:"Add {n} rooms from HA areas",area_rooms_hint:"Adds a room (4 \xD7 3 m) for each area of this floor \u2013 then drag it into place and adjust the corners",floor_name:"Name",elevation:"Elevation (m)",height:"Ceiling height (m)",cut_height:"Cut height (m)",delete_floor:"Delete floor",delete_floor_confirm:"Delete floor \u201C{name}\u201D with all its rooms?",move_up:"Move up",move_down:"Move down",default_floor:"Ground floor",new_floor:"Floor {n}",tool_select:"Select",tool_rect:"Rectangle",tool_polygon:"Free shape",undo:"Undo",redo:"Redo",fit:"Show all",room:"Room",rooms:"Rooms",room_name:"Name",area:"Area",no_area:"No area",material:"Floor",x:"X (m)",z:"Y (m)",width:"Width (m)",depth:"Depth (m)",points:"Corners",delete_point:"Delete corner",duplicate:"Duplicate",delete:"Delete",new_room:"Room {n}",settings:"Settings",pendant_shape:"Shape",pendant_shade:"Shade",pendant_globe:"Globe",pendant_cone:"Cone",pendant_drum:"Drum",pkg_open:"Furnish \u2026",pkg_hint:"Furniture goes against the room's walls; lamps link to the area's lights. Adjust single items afterwards \u2013 Ctrl+Z takes it all back.",pkg_done:"{n} items placed \u2013 Ctrl+Z takes it back.",pkg_kitchen_row:"Kitchen row",pkg_kitchen_row_desc:"Row on the back wall with fridge, oven, sink, dishwasher and stove, wall cabinet, dining table with pendant",pkg_kitchen_l:"L-shaped kitchen",pkg_kitchen_l_desc:"Rows at the back and left, kitchen island with bar stools",pkg_bath:"Bathroom",pkg_bath_desc:"Washbasin, WC, bathtub, washing machine, downlight",pkg_bedroom:"Bedroom",pkg_bedroom_desc:"Double bed with two nightstands, wardrobe, chest of drawers, ceiling light",pkg_living:"Living room",pkg_living_desc:"TV board, sofa, coffee table, rug, armchair, shelf, floor lamp, plant",pkg_dining:"Dining room",pkg_dining_desc:"Table with four chairs, sideboard, pendant",pkg_office:"Office",pkg_office_desc:"Desk with office chair, two shelves, ceiling light",pkg_kids:"Kids' room",pkg_kids_desc:"Single bed, desk, shelf, rug",pkg_hall:"Hall",pkg_hall_desc:"Coat rack, two downlights",spots_place:"Place spots",spots_type:"Lamp",spots_cols:"Columns (left\u2013right)",spots_rows:"Rows (front\u2013back)",spots_add:"Place {n} lamps",spots_placed:"{n} lamps placed.",spots_hint:"All lamps follow the chosen light (e.g. spots on one dimmer). Afterwards each can be moved and linked to another light like any furniture.",cancel:"Cancel",backup:"Backup",backup_history:"Restore points",backup_none:"None yet. While editing, a restore point is kept at most every 10 minutes.",backup_summary:"{rooms} rooms, {furniture} items",backup_restore:"Restore",backup_restore_confirm:"Restore the state of {time}? The current state is kept as a restore point.",backup_restored:"Restored.",backup_file:"File",backup_export:"Export",backup_export_share:"Share as template",backup_export_share_hint:"Without areas, devices, sensors and images \u2013 for passing on to others.",backup_import:"Import \u2026",backup_import_confirm:"Replace the whole plan with the file? The current state is kept as a restore point.",backup_import_error:"The file is no NeonPlan 3D plan ({error}).",backup_imported:"Imported.",backup_hint:"Background images are not part of the file.",backup_full:"Full backup",backup_full_export:"Back up everything (plan, pictures, packs)",backup_full_import:"Restore a full backup \u2026",backup_full_hint:"One file with the plan, every background and screen picture and the installed packs. On restore every pack is checked again; the licence key is not included.",backup_full_confirm:"Replace the plan, the pictures and the packs with the backup? The current state stays as a restore point.",backup_full_not_backup:"This is not a full NeonPlan 3D backup.",backup_full_restored:"Backup restored: {packs} packs, {pictures} pictures.",backup_full_skipped:"Skipped (not verifiable or bound to another installation): {packs}.",export_name_full:"full",device_confirm:"Ask before switching",device_confirm_hint:"A tap in 3D, the quick menu and the room panel ask first. A double tap on the room leaves this device out.",cover_confirm_hint:"Open, close and positions ask first in the quick menu and the room panel, and a swipe on the marker no longer moves the blind (it turns the view instead). Stop never asks.",confirm_switch:"Really switch {name}?",split_handle_hint:"Drag: width of the plan and the 3D view",wall_exterior:"Exterior wall (m)",wall_interior:"Interior wall (m)",grid:"Grid (m)",background:"Template (floor plan image)",background_upload:"Choose image \u2026",background_width:"Width in plan (m)",background_opacity:"Opacity",background_remove:"Remove template",hint_select:"Tap a room to select \xB7 drag corners \xB7 \u201C+\u201D on an edge inserts a corner \xB7 arrow keys nudge \xB7 Del deletes \xB7 Ctrl+Z",hint_rect:"Drag to draw a rectangle",hint_polygon:"Place corners \xB7 tap the first corner or press Enter to close \xB7 Esc cancels",hint_empty:"Add a floor first.",area_m2:"{a} m\xB2",overlap_warning:"Rooms overlap \u2013 walls there are incomplete.",read_only:"Only administrators can edit the floor plan.",mat_wood:"Wood",mat_oak:"Oak",mat_tiles:"Tiles",mat_carpet:"Carpet",mat_stone:"Stone",mat_concrete:"Concrete",card_name:"NeonPlan 3D",card_description:"Your home in 3D (neon).",stats:"{calls} draw calls \xB7 {tris} triangles",stats_fps:"{fps} fps (slowest frame {ms} ms)",stats_idle:"At rest (0 fps)",stats_busy_camera:"camera",stats_busy_floors:"floors",stats_busy_openings:"doors/windows",stats_busy_flash:"flash",stats_busy_roof:"roof",stats_busy_flow:"power flow",stats_busy_effect:"colour effect",stats_busy_robot:"robot",stats_busy_orbit:"camera turn",stats_busy_tint:"room tint",stats_low:"tablet level, pixel ratio {r}",stats_full:"full level, pixel ratio {r}",floors_apart:"Apart",floors_stacked:"Stacked",floor_rooms_one:"1 room",floor_rooms:"{n} rooms",quality:"Quality",quality_auto:"Auto",quality_low:"Tablet",quality_high:"High",state_on:"On",state_off:"Off",state_open:"Open",state_closed:"Closed",state_opening:"Opening",state_closing:"Closing",state_playing:"Playing",state_paused:"Paused",state_idle:"Idle",state_locked:"Locked",state_unlocked:"Unlocked",state_detected:"Detected",state_clear:"Clear",state_unavailable:"Unavailable",state_heat:"Heat",state_cool:"Cool",state_auto:"Auto",state_heat_cool:"Heat/cool",state_dry:"Dry",state_fan_only:"Fan",devices:"Devices",devices_none_area:"Link the room to an area and its devices appear here.",devices_none:"The area has no suitable devices.",devices_place_all_n:"Place all {n} \u2026",devices_place_all_confirm:"Put {n} devices into the room at once? (Ctrl+Z or \u201CUndo\u201D takes them all back in one step.)",devices_src_area:"This area",devices_src_other:"Other areas",devices_src_none:"No area",devices_place:"Place",devices_remove:"Remove",devices_hint:"Placed devices appear in 3D. Drag them in the plan to move them.",panel_lights:"Lights",panel_covers:"Covers",panel_climate:"Heating",panel_media:"Media",panel_switches:"Switches",panel_sensors:"Sensors",panel_scenes:"Scenes & scripts",panel_cameras:"Cameras",camera_live:"Open live view",through_camera:"Look through the camera",through_blend:"Blend",through_back:"Back to the view",camera_mount:"Mount",camera_mount_wall:"Wall (looks along its rotation)",camera_mount_ceiling:"Ceiling (dome, all round)",camera_fov:"Field of view (\xB0)",camera_reach:"Reach (m)",camera_fov_short:"Angle \xB0",camera_reach_short:"Reach m",camera_tilt:"Tilt down (\xB0)",camera_tilt_short:"Tilt \xB0",camera_aim_hint:"In the plan the wedge shows where the camera looks. The handle at its tip turns the camera and sets its reach.",state_recording:"Recording",state_streaming:"Streaming",panel_all_off:"All off",panel_no_area:"This room is not linked to an area. You can link it in the editor.",panel_empty:"No devices of this room are in the plan. In the editor, place devices or pick them for the room panel with \u2606.",close:"Close",brightness:"Brightness",color_temp:"Colour temperature",color:"Colour",position:"Position",cover_open:"Open",cover_stop:"Stop",cover_close:"Close",target_temp:"Target",current_temp:"Current",temp_down:"Cooler",temp_up:"Warmer",volume:"Volume",play_pause:"Play/pause",previous:"Previous",next:"Next",run:"Run",details:"Details",hold_hint:"Tap toggles \xB7 long press opens details",tool_opening:"Doors & windows",tool_furniture:"Furniture",qm_off:"Off",find:"Search",find_placeholder:"Where is \u2026? Device or room",find_none:"Nothing found",swipe_off:"Off",panel_pin:"Show in the room panel",panel_unpin:"Don't show in the room panel",devices_panel_hint:"The room panel shows the devices in the plan. \u2606 adds a device to the room panel without placing it.",card_section_view:"View",card_size:"Size",card_size_fixed:"Fixed height",card_size_fill:"Fill the screen",card_fill_hint:"Works best in a dashboard view of the type \u201CPanel (single card)\u201D \u2013 the card then takes all the space.",card_controls:"Switches in the card",card_floor_thumbs:"Floors as miniatures",card_floor_thumbs_hint:"Small pictures of the floors at the side \u2013 tap one to switch",card_floor_thumbs_hint_start:"The chosen floor is then where the card starts \u2013 the pictures at the side switch to the others",card_room_names:"Show room names",card_section_kiosk:"Wall tablet (kiosk)",card_section_features:"Features",card_weather_plan:"as set in the plan",card_pro_hint:"Motion trail and weather are Pro add-ons: without the matching add-on these switches have no effect.",card_idle_return:"Back to the start view after",card_idle_off:"Never",card_idle_min:"{n} min without a touch",card_idle_hint:"After the wait the card closes the room and shows the start view again.",card_night:"Night dimming",card_night_off:"Off",card_night_sun:"By the sun",card_night_time:"Time range",card_night_range:"Time range (e.g. 22:00-06:00)",card_idle_orbit:"Camera turn as screensaver",card_idle_orbit_hint:"After the return the view turns slowly until someone touches the tablet",card_alerts:"Show warnings",card_alerts_hint:"Smoke, gas, CO, water, alarm panel and windows open in the rain: the room pulses, a note appears at the top",card_alert_jump:"Jump to the room of a new warning",card_alert_jump_hint:"The view switches to the floor and room of the warning by itself",card_scenes:"Scene buttons in the room",card_scenes_hint:"Scenes and scripts of the area as buttons under the 3D view while a room is selected",card_motion_trail:"Motion trail",card_motion_trail_hint:"Where motion was reported in the last 30 minutes, with times (motion, presence and camera sensors)",trail_short:"Trail",weather_short:"Weather",weather_entity:"Weather entity",weather_effects:"Weather effects in 3D",rain_warning:"Warning: window open while it rains",weather_effect_rain:"Rain",weather_effect_snow:"Snow",weather_effect_fog:"Fog (greys the scene)",weather_effect_clouds:"Clouds dim the sky and the sun",weather_effect_lightning:"Lightning in storms",weather_effect_sky:"Sun and moon in the sky",weather_entity_hint:"The weather entity provides rain, snow, fog and clouds for the 3D view; automatic takes the first one.",weather_hint:"Weather outside: rain, snow, fog and clouds from the weather entity, sun and moon from sun.sun",card_weather:"Weather outside",card_weather_hint:"Rain, snow, fog and clouds from the first weather entity (weather_entity picks another); only the clouds on the tablet level",trail_hint:"Motion trail: where motion was reported in the last 30 minutes, with times",alerts:"Warnings",alert_smoke:"Smoke: {name}",alert_gas:"Gas: {name}",alert_co:"Carbon monoxide: {name}",alert_water:"Water: {name}",alert_alarm:"Alarm triggered",alert_alarm_pending:"Alarm pending",alert_window_rain:"Window open in the rain: {name}",room_names_short:"Room names",floor_stack_short_dim:"Dimmed",floor_stack_short_stacked:"Stacked",floor_stack_short_single:"Alone",size_short_w:"W",size_short_d:"D",size_short_h:"H",import_error_not_json:"The file is no JSON.",import_error_not_plan:"The file is no NeonPlan 3D plan.",export_name_template:"template",export_name_backup:"backup",card_floor_stack:"Floors below",floor_stack_dim:"Dimmed",floor_stack_stacked:"Stacked (the house up to here)",floor_stack_single:"Hidden (only this floor)",card_control_walls:"Tall walls/cut",card_control_floors:"Floors apart",card_control_temperature:"Temperature",card_control_humidity:"Humidity",card_control_co2:"CO\u2082",card_controls_hint:"Tall walls/cut, floors apart and temperature, humidity, CO\u2082 to switch",card_fullscreen_button:"Full screen button",card_fullscreen_button_hint:"Hides the dashboard around the card (e.g. on a wall tablet)",fullscreen:"Full screen",fullscreen_exit:"Exit full screen",card_section_show:"Show",card_floor:"Floor",card_floor_house:"Whole house (tap a floor to open it)",card_height:"Height (pixels)",card_walls:"Walls",card_quality_hint:"\u201CTablet\u201D is the lightest setting \u2013 ideal for Fire tablets and other wall tablets.",card_flows_switch:"Switch in the card",card_flows_on:"Always on",card_flows_off:"Always off",card_energy:"Show energy values at the top",card_room_panel:"Room details on tap",card_room_panel_hint:"The room's lights, blinds and cameras in a side panel",card_explode:"Pull floors apart in the house view",card_stats:"Performance display (frames per second)",card_stats_hint:"To check how smoothly the card runs on the device",packs:"Furniture packs",packs_hint:"Only packs signed by the publisher can be imported.",lib_badge_light:"Lamp: links to a light and switches in 3D",lib_badge_electric:"Electric: links to an entity and a power sensor (switching, pictures, consumption)",lib_badge_hint:"Items with a symbol link to entities: lamps switch, screens show pictures, appliances show their consumption.",pack_error_wrong_instance:"This pack is signed for another Home Assistant installation. The shop account can deliver it for this one.",license_title:"Shop connection",license_instance:"Installation id",license_copy:"Copy",license_copied:"Id copied",license_activate:"Activate",license_activated:"Connected \u2013 your packs are listed below.",license_active:"Connected as {name} (key {key})",license_checked:"last checked {time}",license_refresh:"Check now",license_refreshed:"Checked.",license_remove:"Disconnect",license_remove_confirm:"Disconnect from the shop? Installed packs stay, only updates stop coming by themselves.",license_installed:"installed \xB7 v{release}",license_update_available:"update to v{release} available",license_not_installed:"not installed yet",license_install:"Install",license_update:"Update",license_none:"No packs in the account yet.",license_hint:"The licence key is in your order and in your account at mastershort.de. Entered once, bought packs appear here, are signed for this installation and update by themselves (checked once a day). Everything installed keeps working without the connection.",license_shop:"More packs in the shop",license_error_invalid_key:"The shop does not know this key. It looks like NP-XXXX-XXXX-XXXX-XXXX.",license_error_activation_limit:"This key is already bound to the allowed number of installations.",license_error_shop_unreachable:"The shop cannot be reached right now. Installed packs keep working.",license_error_not_owned:"This pack is not in this account.",license_error_no_key:"Enter the licence key first.",license_error_wrong_instance:"The shop signed the pack for another installation.",license_error_other:"That did not work: {detail}",pack_import:"Import furniture packs \u2026",pack_imported:"Imported \u201C{name}\u201D by {publisher} \u2013 {n} items",packs_imported_n:"{n} of {total} packs imported",pack_by:"by {publisher} \xB7 {n} items",pack_features:"by {publisher} \xB7 unlocks {n} Pro features",pro_title:"NeonPlan Pro",pro_feature_camera_cockpit:"Camera cockpit: look through the camera and motion trail",pro_name_camera_cockpit:"Camera cockpit",pro_name_weather:"Weather outside",pro_name_screens:"Live screens",pro_name_energy_pro:"Energy Pro",ext_tab:"Extensions",offers_title:"New in the shop",offers_new:"NEW",offers_loyalty:"Your loyalty discount: {percent} % on every further pack and Pro add-on",offers_kind_pack:"Furniture pack",offers_kind_pro:"Pro add-on",offers_kind_bundle:"Bundle",offers_dot:"New in the shop",pack_updated:"{name} was updated to release {release}.",pack_updated_added:"{name} was updated to release {release}: {n} new items \u2013 have a look in the library!",ext_title:"Extensions",ext_intro:"Furniture packs and Pro add-ons for NeonPlan 3D. Install what you bought here with your licence key; it updates by itself and works without the connection too.",ext_shop:"Open the shop",ext_pro:"Pro add-ons",ext_active:"active",ext_get:"See in the shop",ext_open:"Open extensions",manual:"Manual",manual_more:"Learn more",ext_teaser_title:"More furniture and Pro features",ext_teaser_text:'Furniture packs, the shop connection and Pro add-ons are under "Extensions" at the top.',pro_feature_weather:"Weather outside: rain, snow, clouds, sun and moon",pro_feature_screens:"Live screens: the media player's app colour and artwork, picture rules, camera live pictures on screens",pro_feature_energy_pro:"Energy Pro: power-flow lines through the house, living solar modules, glass hologram with the energy balance \u2013 gas, water and heat follow as updates",pro_locked:"This feature is a Pro add-on. After the purchase it appears under Extensions \u203A Shop connection and installs from there.",pro_shop:"To the shop",pack_licensed:"Licensed to {name}",pack_remove:"Remove",pack_remove_confirm:"Remove the pack \u201C{name}\u201D? Its furniture stays in the plan as plain boxes.",pack_missing_item:"Furniture of a removed pack",pack_error_bad_signature:"The pack was changed or its signature is invalid.",pack_error_unknown_publisher:"This pack is not from a known publisher.",pack_error_unsigned:"The pack is not signed.",pack_error_not_a_pack:"This is not a furniture pack file.",pack_error_invalid_content:"The pack contains invalid furniture: {detail}",pack_error_too_large:"The file is too large.",pack_error_other:"Import failed: {detail}",back_to_room:"Back to {room}",back_to_floor:"Back to the floor",hint_furniture:"Tap a room, then pick an item on the right \xB7 drag items, resize them by their corners",furniture_into:"New items go into the middle of \u201C{room}\u201D.",furniture_pick_room:"Tip: tap a room first \u2013 new items then land in its middle.",flows:"Power flow",flows_hint:"Show or hide glowing lines from the meter to the consumers",holo_title:"Solar & Energy",holo_live:"live",holo_pv_now:"PV now",holo_today:"Today",holo_peak:"Peak",holo_battery:"Battery",holo_grid:"Grid",holo_house:"House",holo_wallbox:"Wallbox",holo_autarky:"Self-sufficiency",furn_name:"Name (optional)",cables_title:"Cables (Energy Pro)",cables_hint:"Dashed: the cable finds its own way. Grab it in the plan or pick it here and press \u201CLay by hand\u201D: it then runs solid over your points at the set height, e.g. along the facade outside or under the ceiling, and several cables can run side by side.",cable_laid:"laid by hand",cable_lay:"Lay by hand",cable_auto:"Automatic again",cable_height:"Height above the floor (m)",cable_points_hint:"Drag the points in the plan. A click on the cable adds a point, a double click on a point removes it.",cable_other_floor:"This cable is laid on the floor {floor}: switch there to drag its points.",holo_settings:"Hologram (Energy Pro)",holo_settings_hint:"The hologram hangs on a solar field and keeps its size in the world: it shrinks as you zoom out. Choose its field, size and offset here.",holo_field:"On the solar field",holo_field_auto:"Automatic (largest field)",holo_size:"Size (1 = normal)",holo_right:"Sideways offset (m, + = right)",holo_up:"Upward offset (m, up the slope)",flow_on:"on",flow_off:"off",hint_opening:"Tap a wall to add a door or window \u2013 choose its kind on the right afterwards",preset_door:"Door",preset_door_double:"Double door",preset_window:"Window",preset_window_double:"Double window",preset_terrace:"Terrace door",preset_terrace_double:"French doors",preset_garage:"Garage door",preset_front:"Front door",opening_style:"Style",style_auto:"Automatic ({style})",style_interior:"Room door",style_front:"Front door",style_front_glass:"Front door with glass",style_sidelight:"Front door with sidelight",style_sidelights:"Front door with two sidelights",style_glass:"Glass door",style_sliding:"Sliding door",style_passage:"Opening (no door)",style_standard:"Standard",style_bars:"With glazing bars",flip_hinge:"Swap hinge side",flip_main_leaf:"Swap main leaf",flip_hinge_hint:"Hinges to the other side",flip_swing:"Reverse opening direction",flip_swing_hint:"The door swings into the room or to the other side",main_leaf:"Main leaf (seen from the room)",contact_main:"Contact main leaf",contact_second:"Contact second leaf",tool_outdoor:"Outdoor",tool_measure:"By measure",hint_measure:"Tap the starting point, then type the wall lengths with their direction on the right",measure:"Room by measure",measure_start:"Tap the starting point in the plan, e.g. a room corner.",measure_from:"Start at {x} / {z} m \u2013 tapping moves the start.",measure_length:"Length of the next wall (m)",measure_close:"Close room",measure_undo:"Remove last wall",measure_gap:"Gap to the start: {gap} m (joined when closing)",measure_hint:"Tip: type a length and press an arrow key. With measured inside dimensions, use \u201CClose gaps\u201D afterwards.",rect_by_size:"Rectangle by size",rect_add:"Add rectangle",dir_up:"Up",dir_down:"Down",dir_left:"Left",dir_right:"Right",hint_outdoor:"Drag to draw an outdoor area (lawn, terrace, pool \u2026)",outdoor:"Outdoor area",outdoor_type:"Type",outdoor_hint:"Outdoor lights (path light, garden spot, outdoor wall light) light all outdoor areas and the facade.",out_lawn:"Lawn",out_terrace:"Terrace",out_path:"Path",out_driveway:"Driveway",out_pool:"Pool",out_bed:"Flower bed",out_hedge:"Hedge",out_fence:"Fence",north:"North (\xB0 clockwise from up)",north_hint:"North is needed for the sun (light through the windows).",roof:"Roof",roof_none:"No roof",roof_flat:"Flat roof",roof_gable:"Gable roof",roof_custom:"Roof sections (custom)",roof_sections:"Roof sections",roof_sections_hint:"Each roof section covers a rectangle of the house, e.g. the house, the barn or an extension \u2013 each with its own shape, ridge direction, eave height and pitch. Drag in the plan to draw a new one; tap selects it, dragging moves it, the corners resize it.",roof_sections_start:"Create roof sections from the rooms",roof_sections_regen:"Create again from the rooms",roof_sections_off:"Back to one roof",roof_regen_confirm:"Replace all roof sections with a new proposal from the rooms?",roof_section:"Roof section",roof_section_hint:"Heights count from the ground. A side with a lower eave reaches further down (catslide); pent roofs rise from the first side.",roof_shape_gable:"Gable",roof_shape_hip:"Hip",roof_shape_pent:"Pent",roof_shape_flat:"Flat",roof_axis_x:"Ridge \u2194",roof_axis_z:"Ridge \u2195",roof_eave:"Eave (m)",roof_pitch_short:"Pitch (\xB0)",roof_height:"Height (m)",roof_base:"Top of walls (m)",roof_ridge_height:"Ridge height",roof_side_top:"top",roof_side_bottom:"bottom",roof_side_left:"left",roof_side_right:"right",roof_swap:"Swap sides",roof_open:"Canopy (posts instead of walls, see-through)",roof_open_short:"Canopy",roof_open_hint:"For a terrace roof or a carport: posts and beams carry the roof instead of walls, and it is see-through. Where the canopy meets the house wall, it rests on the wall.",roof_swap_hint:"Turns the roof round: the two sides swap eave and pitch, a pent roof rises the other way.",roof_pitch:"Roof pitch (\xB0)",roof_overhang:"Roof overhang (m)",roof_ridge:"Ridge",roof_ridge_long:"Along the long side",roof_ridge_short:"Along the short side (e.g. terraced house)",device:"Device",lamp_mount:"Lamp",lamp_ceiling:"Ceiling light",lamp_floor:"Floor lamp",lamp_table:"Table lamp",lamp_wall:"Wall light",marker_height:"Marker height (m)",height_auto:"Automatic height",device_centre:"To room centre",lights_spread:"Spread ceiling lights evenly",devices_search:"Search devices \u2026",devices_more:"+{n} more",devices_less:"less",panel_more:"More devices of the area ({n})",panel_less:"Show less",gaps_close:"Close gaps",gaps_hint:"Join rooms up to 60 cm apart at one shared wall; the gap becomes the interior wall thickness.",gaps_none:"No gaps between rooms found.",gaps_closed:"{n} places closed.",gaps_closed_wall:"{n} places closed, interior wall now {t} m.",fps:"FPS",fps_title:"Performance display (frames per second)",hint_garage:"Tap a wall to add a garage door",opening_garage:"Garage door",garage_hint:"The door follows a garage cover (position or open/closed) or a garage door contact of the room's area.",door_hint:"With a door contact the leaf swings open; without a sensor it stands half open.",hint_door:"Tap a wall to add a door",hint_window:"Tap a wall to add a window",opening_door:"Door",opening_window:"Window",opening_type:"Type",opening_position:"Centre from corner (m)",sill:"Sill height (m)",opening_height:"Height (m)",hinge:"Hinge (seen from the room)",hinge_left:"Left",hinge_right:"Right",cover_entity:"Blind",cover_position_entity:"Position sensor (live)",cover_position_invert:"Sensor counts the other way round (0 = open)",contact_entity:"Contact",sensor_kind:"Sensor type",sensor_kind_contact:"Window contact (open/closed)",sensor_kind_handle:"Handle sensor (open/tilted/closed)",sensor_kind_contact_tilt:"Contact + tilt sensor",handle_entity:"Handle sensor",handle_main:"Handle sensor main leaf",leaf_main:"Main leaf",leaf_second:"Second leaf",tilt_entity:"Tilt sensor",entity_auto:"Automatic ({name})",entity_auto_none:"Automatic (none found)",entity_none:"None",entity_search:"Type to search \u2026",opening_hint:`Sensor type: window contact (reports open/closed), handle sensor (reports open, tilted and closed \u2013 e.g. a Homematic window handle) or contact + tilt sensor (a second sensor that only reports tilted). Automatic uses the blinds and contacts of the room's area. Position sensor: an entity reporting the blind's position while it moves (e.g. a Homematic "level", 0\u2013100 % or 0\u20131, open = high) \u2013 the blind then moves live in 3D.`,furniture:"Furniture",furniture_add:"Add furniture",furniture_search:"Search furniture \u2026",furniture_type:"Item",rotation:"Rotation (\xB0)",rotate_left:"\u21BA 90\xB0",rotate_right:"\u21BB 90\xB0",height_m:"Height (m)",furn_sofa:"Sofa",furn_armchair:"Armchair",furn_table:"Table",furn_chair:"Chair",furn_bed:"Bed",furn_nightstand:"Nightstand",furn_wardrobe:"Wardrobe",furn_shelf:"Shelf",furn_kitchen:"Kitchen unit",furn_worktop:"Worktop",furn_fridge:"Fridge",furn_fridge_smart:"Smart fridge (side by side)",furn_door_left:"Door sensor left (freezer side)",furn_door_right:"Door sensor right (fridge side)",fridge_hint:"While a door sensor reports open, the door swings open in 3D. The screen on the right door shows pictures by rules like a TV \u2013 while that door is closed.",furn_stove:"Stove",furn_sink:"Sink",furn_bathtub:"Bathtub",furn_shower:"Shower",furn_wc:"WC",furn_washbasin:"Washbasin",furn_desk:"Desk",furn_tv_board:"TV board",furn_plant:"Plant",furn_rug:"Rug",furn_stairs:"Stairs",furn_stairwell:"Floor opening",stairwell_hint:"A hole in this floor, for example above the staircase or for a gallery; from above you look through it. The opening must lie within one room; several openings may overlap (for an L shape, for example). Stairs on the floor below that reach up here open the floor by themselves as well.",tool_hole:"Floor opening",tool_roof:"Roof",tool_energy:"Energy",tool_wall:"Wall",hint_wall:"Drag to draw a single wall (partition, half wall) \xB7 Shift keeps it straight \xB7 Alt without snapping",free_wall:"Wall",wall_length:"Length (m)",wall_thickness:"Wall thickness (m)",wall_height:"Height (m)",wall_height_full:"Full room height",wall_heights:"Wall heights",wall_n:"Wall {a}\u2013{b}",wall_exterior_short:"exterior wall",room_wall_hint:"A lower height turns the wall into a parapet or a counter. If two rooms share the wall, the lower setting applies. Windows and doors in it end at the wall height.",free_wall_hint:"A free-standing wall, e.g. a partition. Where it meets a room wall, the corner is mitred. Drag the handles to move its ends, drag the line to move the whole wall.",stairwell_outside:"This opening reaches across a room boundary and is therefore not cut. Move it fully into one room or make it smaller.",hint_hole:"Drag to draw a floor opening (stairwell, gallery)",hint_roof:"Drag to draw a roof section \xB7 tap selects \xB7 drag moves \xB7 corners resize",hint_energy:"Tap a solar field to select it \xB7 drag to move it, also onto another roof face \xB7 new fields with + Solar field on the right",furn_parking:"Parking spot",furn_group_vehicles:"Parking",parking_entity:'Sensor "car present"',parking_vehicle:"Vehicle",parking_vehicle_none:"None",parking_no_pack:'No vehicle pack imported \u2013 vehicles come from the "Vehicles" pack (Furniture \u2192 Import furniture pack).',parking_scale:"Size (%)",parking_type_entity:"Vehicle type sensor (optional)",parking_types:"State \u2192 vehicle",parking_type_state:"State (e.g. van)",parking_add_type:"+ Mapping",parking_hint:'Without a sensor the vehicle always stands there. With one it appears as soon as the sensor reports "on", "home" or "present". A vehicle type sensor (e.g. from an AI camera analysis) picks the model: when its state matches a mapping \u2013 also as a word in the text \u2013 that vehicle is shown, otherwise the default one.',parking_too_tall:"The vehicle ({car} m) is taller than the room ({room} m).",furn_lamp_ceiling:"Ceiling light",furn_lamp_downlight:"Downlight",furn_lamp_spot:"Surface spot",furn_lamp_panel:"LED panel",furn_lamp_uplight:"Floor uplight",furn_lamp_bollard:"Path light",furn_lamp_garden:"Garden spot",furn_radiator:"Radiator",furn_robot_vacuum:"Robot vacuum",furn_entity_vacuum:"Robot vacuum",furn_robot_room:"Current room (sensor)",robot_hint:"While the robot cleans in Home Assistant it drives lanes in 3D through the room it reports (a \u201Ccurrent room\u201D sensor, matched by room or area name), else through the room of its dock. The track is simulated \u2013 Home Assistant usually does not know the exact position. It drives back to the dock when it returns.",furn_lamp_pendant:"Pendant light",furn_lamp_floor:"Floor lamp",furn_lamp_table:"Table lamp",furn_lamp_wall:"Wall light",furn_led_strip:"LED strip",furn_group_lights:"Lights",furn_entity_light:"Light or switch",furn_entity_climate:"Heating (thermostat)",lamp_hint:"Tap the lamp in 3D to switch it, long press for the quick menu. Switches work too (e.g. a relay for the ceiling light) \u2013 the lamp shines while it is on. Table lamps stand on the furniture below them.",lamp_hint_pendant:"Height = drop below the ceiling. Tap in 3D to switch, long press for details.",theme:"Look",theme_neon:"Neon",theme_blueprint:"Blueprint",theme_day:"Day",furnish:"Furnish",split_3d:"3D beside",mount_height:"Height above the floor (m)",side_open:"Open the sidebar",side_close:"Close",side_details:"Details of the selection",side_pin:"Pin",side_pinned:"Pinned",side_pin_hint:"Pinned, the sidebar stays open; otherwise it folds away beside the 3D view while nothing is selected",split_3d_hint:"Live 3D next to the plan: drag and turn furniture and devices there \u2013 with undo, saved with the plan",size_w:"Width (m)",size_d:"Depth (m)",size_h:"Height (m)",furnish_hint:"Drag furniture, lamps and devices \xB7 furniture snaps to walls \xB7 tap one to turn it, set its height and mount",done:"Done",heatmap:"Heatmap",heat_off:"Normal",heat_short_temperature:"Temp.",heat_short_humidity:"Humidity",heat_short_co2:"CO\u2082",heat_temperature:"Temperature",heat_humidity:"Humidity",heat_co2:"CO\u2082",heat_none_found:"No matching sensors in the rooms' areas.",markers:"Markers",markers_none:"None",markers_important:"Important",markers_all:"All",furn_stool:"Stool",furn_coffee_table:"Coffee table",furn_tv_wall:"TV (wall)",furn_sideboard:"Sideboard",furn_table_round:"Round table",furn_bench:"Bench",furn_corner_bench:"Corner bench",furn_bar_stool:"Bar stool",furn_kitchen_wall:"Wall cabinet",furn_kitchen_tall:"Tall unit with oven",furn_island:"Kitchen island",furn_dishwasher:"Dishwasher",furn_bunk_bed:"Bunk bed",furn_dresser:"Chest of drawers",furn_washer:"Washing machine",furn_dryer:"Dryer",furn_office_chair:"Office chair",furn_tall_cabinet:"Tall cabinet",furn_coat_rack:"Coat rack",furn_group_living:"Living",furn_group_dining:"Dining",furn_group_energy:"Energy & solar",energy_devices:"Devices",solar_pro_title:"Solar & Energy Pro",solar_pro_soon:"coming soon",solar_pro_1:"Modules that come alive in the sun and glow with their output",solar_pro_2:"Fine power-flow lines through the house: where the power comes from and where it goes",solar_pro_3:"A glass hologram with power, day curve, today's yield and self-sufficiency",solar_pro_4:"Values per string on the roof, battery, wallbox and grid at a glance",solar_pro_free:"Everything you set up here (fields, strings, devices, sensors) stays free and is used by the Pro add-on directly.",wallbox_charging:"charging",wallbox_plugged:"plugged in",furn_soc:"State of charge (%)",furn_wallbox_status:"Status (charging, plugged in)",energy_only_note:"\u26A1 Energy: only solar fields and energy devices can be moved here; rooms and furniture are locked.",roof_only_note:"\u{1F3E0} Roof: only roof sections and roof windows can be moved here; rooms and furniture are locked.",energy_devices_hint:"Meter, inverters, home batteries, wallboxes and the grid connection are added here: on the floor chosen above, movable in the plan. With a power sensor they show their watts; the meter takes the grid sensor, a string picks its inverter. Several inverters and batteries (say a balcony plant on top) work too: each gets its own sensor.",solar_fields:"Solar fields",solar_hint:"Put modules on the roof: they lie in the slope of the roof face; on a flat roof they stand on frames. Drag a field in the plan to move it.",solar_no_roof:"Solar fields need a roof: a gable or flat roof under Settings, or roof sections here in the Roof tool.",solar_face_gone:"roof face missing",solar_summary:"{n} modules \xB7 {kwp} kWp",solar_add:"Solar field",solar_field:"Solar field",solar_face:"Roof face",solar_rows:"Rows",solar_cols:"Modules per row",solar_portrait:"Portrait",solar_landscape:"Landscape",solar_u:"Distance from the edge (m)",solar_v:"Distance from the eave (m)",solar_tilt:"Tilt of the frames (\xB0)",solar_flip:"Lean the other way",solar_partial:"only {n} of {total} fit on the face",solar_form_hint:"Modules that would reach beyond the roof face are left out. \u201CFill face\u201D puts as many modules on the roof as fit. kWp counted with 400 W per module.",solar_fit:"Fill face",roof_windows:"Roof windows",roof_window:"Roof window",roof_windows_hint:"Roof windows lie in the roof face, with a blind and contacts like windows. Drag them in the plan, also onto another roof face.",roof_window_tilt:"Tilt contact",roof_window_hint:"Open, the sash swings out, hinged at the top; tilted, a little; the blind comes down over the glass from the top.",solar_ground:"Free-standing (garden, garage roof \u2026)",solar_add_ground:"Free-standing",solar_base:"Height of the surface (m, 0 = ground)",solar_add_wall:"On a wall",solar_wall:"Wall",solar_v_wall:"Height above the floor (m)",solar_tilt_wall:"Tilt away from the wall (\xB0, 90 = canopy)",solar_flip_wall:"Standing off at the bottom instead of the top",solar_rotation:"Rotation (\xB0)",solar_name:"Name",solar_name_hint:"e.g. string 1 south",solar_module_w:"Module width (m)",solar_module_h:"Module height (m)",solar_string:"String",solar_strings:"Strings",solar_string_none:"No string",solar_string_new:"New string",solar_string_n:"String {n}",solar_string_name:"Name of the string",solar_string_entity:"PV power of the string",solar_string_inverter:"Inverter",solar_string_inverter_none:"No inverter chosen",solar_string_inverter_missing:"No inverter in the plan yet (add one below under Devices)",solar_string_hint:"Fields in the same string belong together, also on different roofs (e.g. 5 modules on the house and 5 on the garage). Sensor and inverter count for the whole string.",solar_string_sum:"{fields} fields \xB7 {n} modules \xB7 {kwp} kWp",solar_face_size:"Roof face {w} \xD7 {h} m (along the eave \xD7 up the slope)",solar_cols_hint:"One number for rows of equal length, or a list for rows of their own: \u201C4, 4, 3\u201D (from the eave).",solar_align_left:"Left",solar_align_center:"Centre",solar_align_right:"Right",solar_look_black:"Full black",solar_look_blue:"Blue",solar_pick:"Modules on/off one by one",solar_pick_all:"All on again",solar_pick_hint:"Tap a module in the plan to take it away or put it back. Removed ones are dashed.",solar_entity:"PV power of this field (e.g. its string)",solar_main:"Main roof",solar_section:"Section {n}",solar_flat:"flat roof",compass_n:"north",compass_ne:"north-east",compass_e:"east",compass_se:"south-east",compass_s:"south",compass_sw:"south-west",compass_w:"west",compass_nw:"north-west",furn_meter:"Electricity meter",furn_grid_point:"Grid connection",grid_point_hint:"Here the grid cable ends: at the handover point to the utility, e.g. at the end of the driveway. Movable in the plan; without a grid connection the cable ends at the edge of the outdoor areas.",furn_model:"Model",inverter_std:"Standard (wall unit with display)",inverter_slim:"Slim and tall (light strip)",inverter_hybrid:"Hybrid (round dial, fans)",battery_std:"Tower (stacked modules)",battery_wall:"Wall battery (flat, hanging)",battery_cube:"Compact (balcony battery)",furn_inverter:"Solar inverter",furn_home_battery:"Home battery",furn_wallbox:"Wallbox",furn_group_kitchen:"Kitchen",furn_group_sleeping:"Sleeping",furn_group_bath:"Bath & laundry",furn_group_work:"Work & other",furn_entity:"Device (switch, plug \u2026)",furn_entity_tv:"TV (media player or smart plug)",fix:"Fix",unfix:"Release",fix_hint:"Fixed: cannot be moved by accident any more (key L, right-click or long press)",fixed_drag_hint:"\u{1F512} Fixed \u2013 release it first to move it (lock in the form, right-click or key L)",fixed_delete_confirm:"This item is fixed. Delete it anyway?",lock_plan:"\u{1F512} Floor plan",lock_plan_hint:"Lock the floor plan: rooms, walls, doors, windows and outdoor areas cannot be moved by accident. Furniture and devices stay free.",ctx_rotate:"Turn 90\xB0",devices_placed_in:"in {room}",devices_narrow:"{n} more \u2013 narrow the search",climate:"Room climate",climate_temperature:"Temperature",climate_humidity:"Humidity",climate_co2:"CO\u2082",climate_hint:"These sensors count for the heatmap and the room panel. \u201CAutomatic\u201D takes the sensors of the area and the ones placed in the room, but no device temperatures (3D printer, heat pump, flow \u2026).",plan_locked:"Floor plan locked",plan_lock:"Lock floor plan",plan_unlock:"Unlock floor plan",opening_mark:"Highlight in 3D",opening_mark_open:"When open",opening_mark_closed:"When closed (e.g. WC)",opening_mark_hint:"A highlighted window or door glows warm. \u201CWhen closed\u201D needs a contact; without a sensor nothing is highlighted.",marker_show:"Marker in 3D",marker_show_hint:"Automatic follows the None / Important / All switch of the 3D view. Always show and Hide apply regardless (except with None).",marker_show_auto:"Automatic",marker_show_always:"Always show",marker_show_no_power:"Without watts",marker_show_never:"Hide",furn_power:"Power sensor (W)",furn_links_hint:"With a power sensor the item shows its watts and gets an energy cable.",screen_pictures:"Pictures by state",screen_pictures_hint:`The state or an attribute of the entity is compared (e.g. a TV's app_name). A value matches when it is equal or contained in the text ("youtube" matches "com.google.android.youtube.tv"); "*" = always. The first matching rule wins. Pictures are stored scaled to 512 px; a picture URL or a camera works too \u2013 a camera's live picture is refreshed every 5 seconds while shown. Without a matching rule the screen shows the media player.`,picture_state:"is or contains \u2026 (e.g. netflix)",picture_state_of:"State",picture_attribute:"Compare the state or an attribute",picture_pick:"Choose picture \u2026",picture_change:"Change picture \u2026",picture_url:"or picture URL",picture_add_value:"+ Value",picture_reuse:"Use a stored picture",picture_camera:"or a camera (live picture) \u2026",picture_camera_none:"No camera",screen_bg:"Screen behind the picture",screen_bg_black:"Dark",screen_bg_white:"White",picture_add_entity:"+ Another entity",picture_current:"now: {value}",picture_matches:"\u2713 matches now \u2013 this picture shows",furn_links_hint_tv:"The screen glows while the TV is on, in the colour of the app (Netflix, YouTube \u2026); the label shows the app or title.",stairs_hint:"The stair rises towards the back (away from the marked front edge) and opens the ceiling of the floor above.",floor_lights:"{n} lights on",floor_open:"{n} open",floor_persons:"{n} people",energy_consumption:"Consumption",energy_grid_import:"Grid import",energy_grid_export:"Export",energy_solar:"Solar",energy_battery:"Battery",energy_tariff:"Tariff",energy:"Energy",energy_meter:"Meter",energy_grid:"Grid (W, + = import)",energy_solar_sensor:"Solar production (W)",energy_battery_sensor:"Battery power (W, + = discharging)",energy_battery_soc:"Battery charge (%)",energy_tariff_sensor:"Tariff (e.g. \u20AC/kWh)",energy_invert:"Invert sign",energy_hint:"Consumers are placed devices with a power sensor (W) \u2013 the sensor itself or one of the same device.",energy_balance:"Energy balance",energy_balance_hint:"Grid, solar and battery come from the devices in the plan: meter, inverter and home battery. Here you can choose other sensors, flip signs and set the house consumption.",energy_consumption_sensor:"House consumption (W, else from the balance)",energy_import_prefs:"Take over from the energy dashboard",energy_import_done:"{n} sensors taken over \u2013 please check the signs.",energy_import_none:"No matching power sensors (W) were found in the energy dashboard \u2013 please choose them by hand.",energy_import_failed:"Home Assistant's energy dashboard is not set up.",tool_meter:"Meter",hint_meter:"Tap the spot of the meter",presence:"Presence",presence_hint:"Room sensor per person (e.g. ESPresense, Bermuda): its state names the room or area.",presence_sensor:"Room sensor",no_persons:"There are no people in Home Assistant."};function Fe(o,e,t={}){let i=((o?.language??navigator.language).startsWith("de")?lr:Eo)[e]??lr[e]??e;for(let[s,r]of Object.entries(t))i=i.replace(`{${s}}`,String(r));return i}function C(o,e,t=2){return e.toLocaleString(o?.language??void 0,{maximumFractionDigits:t})}var Fo={light:"M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.4 1.1 2.2v.5h5V16c0-.8.4-1.6 1.1-2.2A6 6 0 0 0 12 3z",switch:"M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM12 8v8",fan:"M12 12c0-4 1-8 4-8s2 5-4 8zm0 0c4 0 8 1 8 4s-5 2-8-4zm0 0c0 4-1 8-4 8s-2-5 4-8zm0 0c-4 0-8-1-8-4s5-2 8 4z",cover:"M4 4h16v3H4zM5 7v13M19 7v13M7 10h10M7 13h10M7 16h10",climate:"M12 14.5V5a2 2 0 1 0-4 0v9.5a4 4 0 1 0 4 0zM10 11v6M16 6h4M16 10h3",media:"M4 6h16v10H4zM9 20h6M12 16v4M10.5 8.8v4.4l3.8-2.2z",lock:"M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3M12 14.5v2",sensor:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",binary:"M5 21V4h11v17M16 21H4M8 21V7h5v14M12.5 13.5h.01",camera:"M4 7h11v10H4zM15 10.5l5-3v9l-5-3",scene:"M5 19l9-9M14 4l.8 2.2L17 7l-2.2.8L14 10l-.8-2.2L11 7l2.2-.8zM19 11l.5 1.5L21 13l-1.5.5L19 15l-.5-1.5L17 13l1.5-.5z",script:"M8 4h9a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2h9M8 4a2 2 0 0 0-2 2v10M9 9h6M9 12h4"};function ft(o){return Fo[o]}var Ne=oe`
  :host {
    --fp3d-bg: #070b14;
    --fp3d-bg2: #0d1424;
    --fp3d-chrome: rgba(14, 21, 38, 0.86);
    --fp3d-chrome-solid: #0f1729;
    --fp3d-line: rgba(120, 170, 255, 0.16);
    --fp3d-text: #e6eefc;
    --fp3d-muted: #8a9bb8;
    --fp3d-accent: #37e0ff;
    --fp3d-accent-text: #041018;
    --fp3d-soft: #5b7cff;
    --fp3d-warm: #ffb547;
    --fp3d-danger: #ff6b8b;
    --fp3d-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
    --fp3d-font: "Figtree", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --fp3d-title-font: "Bricolage Grotesque", "Figtree", system-ui, sans-serif;
    color-scheme: dark;
    font-family: var(--fp3d-font);
    color: var(--fp3d-text);
  }
`,Ht=oe`
  .fp3d-seg {
    display: inline-flex;
    padding: 3px;
    gap: 2px;
    border-radius: 999px;
    background: var(--fp3d-chrome);
    box-shadow: var(--fp3d-shadow);
  }
  .fp3d-seg button,
  .fp3d-chip {
    font: inherit;
    font-weight: 500;
    border: none;
    background: none;
    color: var(--fp3d-muted);
    padding: 7px 13px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    min-height: 34px;
  }
  .fp3d-seg button[aria-pressed="true"],
  .fp3d-chip[aria-pressed="true"] {
    background: var(--fp3d-accent);
    color: var(--fp3d-accent-text);
  }
  .fp3d-seg button:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .fp3d-chip {
    background: var(--fp3d-chrome);
    color: var(--fp3d-text);
    box-shadow: var(--fp3d-shadow);
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--fp3d-accent);
    outline-offset: 2px;
  }
  .fp3d-btn {
    font: inherit;
    font-weight: 600;
    border: 1px solid var(--fp3d-line);
    background: rgba(55, 224, 255, 0.06);
    color: var(--fp3d-text);
    border-radius: 10px;
    padding: 7px 12px;
    cursor: pointer;
    min-height: 34px;
  }
  .fp3d-btn:hover {
    border-color: var(--fp3d-accent);
  }
  .fp3d-btn.fp3d-danger {
    color: var(--fp3d-danger);
  }
  .fp3d-btn.fp3d-primary {
    background: var(--fp3d-accent);
    color: var(--fp3d-accent-text);
    border-color: transparent;
  }
  .fp3d-field {
    display: grid;
    gap: 4px;
    font-size: 12px;
    color: var(--fp3d-muted);
  }
  .fp3d-field input,
  .fp3d-field select {
    font: inherit;
    font-size: 14px;
    color: var(--fp3d-text);
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--fp3d-line);
    border-radius: 8px;
    padding: 7px 9px;
    min-width: 0;
  }
  .fp3d-field input[type="range"] {
    padding: 0;
    accent-color: var(--fp3d-accent);
  }
  .fp3d-field select option {
    background: var(--fp3d-chrome-solid);
  }
  /* fingers need 40 px */
  @media (pointer: coarse) {
    .fp3d-seg button,
    .fp3d-chip,
    .fp3d-btn {
      min-height: 40px;
    }
  }
`;var Un=40,qn=class extends ne{static properties={options:{attribute:!1},fixed:{attribute:!1},value:{attribute:!1},disabled:{type:Boolean},placeholder:{attribute:!1},_query:{state:!0},_open:{state:!0},_cursor:{state:!0}};blurTimer;constructor(){super(),this.options=[],this.fixed=[],this.value=null,this.disabled=!1,this.placeholder="",this._query="",this._open=!1,this._cursor=0}get current(){return[...this.fixed,...this.options].find(e=>e.id===this.value)}get hits(){let e=this._query.trim().toLowerCase(),t=e.split(/\s+/).filter(Boolean),n=r=>{let a=`${r.label} ${r.id}`.toLowerCase();return t.every(l=>a.includes(l))},i=this.fixed.filter(r=>!e||n(r)),s=e?this.options.filter(n):this.options;return[...i,...s.slice(0,Un)]}choose(e){this.value=e,this._query="",this._open=!1,this.dispatchEvent(new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0}))}onKey(e){let t=this.hits;e.key==="ArrowDown"?(this._open=!0,this._cursor=Math.min(t.length-1,this._cursor+1),e.preventDefault()):e.key==="ArrowUp"?(this._cursor=Math.max(0,this._cursor-1),e.preventDefault()):e.key==="Enter"?(this._open&&t[this._cursor]&&this.choose(t[this._cursor].id),e.preventDefault()):e.key==="Escape"&&(this._open=!1,this._query="")}render(){let e=this.current,t=this._open?this.hits:[];return v`<div class="wrap">
      <input
        type="text"
        role="combobox"
        aria-expanded=${this._open}
        ?disabled=${this.disabled}
        placeholder=${e?e.label:this.placeholder}
        .value=${this._open?this._query:e?.label??""}
        @focus=${()=>{clearTimeout(this.blurTimer),this._open=!0,this._query="",this._cursor=0}}
        @blur=${()=>{this.blurTimer=setTimeout(()=>this._open=!1,150)}}
        @input=${n=>{this._query=n.target.value,this._cursor=0,this._open=!0}}
        @keydown=${this.onKey}
      />
      ${this._open?v`<ul class="list" role="listbox">
            ${t.length?w:v`<li class="empty">–</li>`}
            ${t.map((n,i)=>v`<li
                role="option"
                aria-selected=${n.id===this.value}
                class="${i===this._cursor?"cursor":""} ${n.id===this.value?"chosen":""}"
                @mousedown=${s=>s.preventDefault()}
                @click=${()=>this.choose(n.id)}
              >
                <span>${n.label}</span>${n.id.includes(".")?v`<small>${n.id}</small>`:w}
              </li>`)}
            ${this._query&&this.options.length>Un&&t.length>=Un?v`<li class="empty">…</li>`:w}
          </ul>`:w}
    </div>`}static styles=[Ne,oe`
      :host {
        display: block;
        position: relative;
      }
      input {
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        color: var(--fp3d-text);
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        padding: 8px 10px;
      }
      input::placeholder {
        color: var(--fp3d-text);
        opacity: 0.9;
      }
      input:focus::placeholder {
        color: var(--fp3d-muted);
      }
      input:focus {
        outline: 2px solid var(--fp3d-accent);
        outline-offset: -1px;
      }
      .list {
        position: absolute;
        left: 0;
        right: 0;
        top: calc(100% + 4px);
        z-index: 20;
        margin: 0;
        padding: 4px;
        list-style: none;
        max-height: 280px;
        overflow-y: auto;
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        box-shadow: var(--fp3d-shadow);
      }
      li {
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding: 6px 8px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13.5px;
      }
      li small {
        color: var(--fp3d-muted);
        font-size: 11px;
      }
      li.cursor,
      li:hover {
        background: color-mix(in srgb, var(--fp3d-accent) 18%, transparent);
      }
      li.chosen {
        color: var(--fp3d-accent);
      }
      li.empty {
        color: var(--fp3d-muted);
        cursor: default;
      }
    `]};customElements.get("fp3d-entity-picker")||customElements.define("fp3d-entity-picker",qn);var Ao=new URL(import.meta.url),Io=new URL("./neonplan3d-3d.js?v=eeb8e43bab8a",Ao).href,cr;function dr(){return cr??=import(Io),cr}function mt(o,e){if(!rn(e))return Fe(o,`furn_${e}`);let t=ee(e);return t?Re(t,o?.language??navigator.language):Fe(o,"pack_missing_item")}var Xn=class extends ne{static properties={hass:{attribute:!1},packs:{attribute:!1},_packMsg:{state:!0},_license:{state:!0},_licenseKey:{state:!0},_licenseBusy:{state:!0},_licenseMsg:{state:!0}};licenseLoading=!1;freshUpdates=null;constructor(){super(),this._packMsg=null,this._license=null,this._licenseKey="",this._licenseBusy=null,this._licenseMsg=null}get isAdmin(){return this.hass?.user?.is_admin??!1}t(e,t){return Fe(this.hass,e,t)}render(){let e=Rn(this.packs??[]);return v`<div class="fp3d-ext">
      <header class="fp3d-ext-head">
        <h2>${this.t("ext_title")}</h2>
        <p class="fp3d-sub">${this.t("ext_intro")}</p>
        <div class="fp3d-ext-actions">
          <a class="fp3d-btn fp3d-primary" href=${nt(this.hass?.language)} target="_blank" rel="noopener">${this.t("ext_shop")}</a>
          <a class="fp3d-btn" href=${it(this.hass?.language,"extensions")} target="_blank" rel="noopener">📖 ${this.t("manual")}</a>
        </div>
      </header>
      ${this.renderUpdates()} ${this.renderOffers()} ${this.renderShop()}
      <section class="fp3d-ext-card">
        <h3>${this.t("ext_pro")}</h3>
        <div class="fp3d-ext-pro">
          ${In.map(t=>v`<div class="fp3d-ext-feature ${e.has(t)?"fp3d-ext-on":""}">
              <b>${e.has(t)?"\u2713":"\u{1F512}"} ${this.t(`pro_name_${t}`)}</b>
              <span class="fp3d-sub">${this.t(`pro_feature_${t}`)}</span>
              <span class="fp3d-ext-links">
                ${e.has(t)?v`<span class="fp3d-ext-state">${this.t("ext_active")}</span>`:v`<a class="fp3d-ext-link" href=${nt(this.hass?.language)} target="_blank" rel="noopener">${this.t("ext_get")}</a>`}
                <a class="fp3d-ext-link" href=${it(this.hass?.language,t)} target="_blank" rel="noopener">${this.t("manual_more")}</a>
              </span>
            </div>`)}
        </div>
      </section>
      ${this.renderPacks()}
    </div>`}async loadLicense(){if(!(!this.hass||this.licenseLoading)){this.licenseLoading=!0;try{this._license=await tn(this.hass)}catch{this._license=null}finally{this.licenseLoading=!1}}}async shopCall(e,t,n){this._licenseBusy=e,this._licenseMsg=null;try{this._license=await t(),n&&(this._licenseMsg={ok:!0,text:n})}catch(i){let{code:s,message:r}=i??{},a=`license_error_${s}`,l=this.t(a);this._licenseMsg={ok:!1,text:l===a?this.t("license_error_other",{detail:r??String(i)}):l}}finally{this._licenseBusy=null}}async installFromShop(e){if(!this.hass)return;let t=this.hass;await this.shopCall(e.id,async()=>{let n=await Ai(t,e.id);return this._packMsg={ok:!0,text:this.t("pack_imported",{name:n.name,publisher:n.publisher,n:n.items})},this.dispatchEvent(new CustomEvent("packs-changed",{bubbles:!0,composed:!0})),tn(t)})}renderUpdates(){let e=this._license;return e?.active?(this.freshUpdates||(this.freshUpdates=$i(e.updates??[]),xi(e.updates??[])),this.freshUpdates.length?v`<section class="fp3d-ext-card fp3d-updates">
      ${this.freshUpdates.map(t=>v`<p>✨ ${t.added>0?this.t("pack_updated_added",{name:t.name,release:t.release,n:t.added}):this.t("pack_updated",{name:t.name,release:t.release})}</p>`)}
    </section>`:w):w}renderOffers(){let e=this._license;if(!e?.active)return w;let t=[...e.offers??[]].sort((i,s)=>Number(s.new)-Number(i.new)),n=e.loyalty??null;return!t.length&&!n?w:(wi(t),this.dispatchEvent(new CustomEvent("offers-seen",{bubbles:!0,composed:!0})),v`<section class="fp3d-ext-card fp3d-offers">
      <h3>${this.t("offers_title")}</h3>
      ${n?v`<div class="fp3d-loyalty">
            <span>🎁 ${this.t("offers_loyalty",{percent:n.percent})}</span>
            <code>${n.code}</code>
            <button
              class="fp3d-btn"
              @click=${async()=>{try{await navigator.clipboard.writeText(n.code),this._licenseMsg={ok:!0,text:this.t("license_copied")}}catch{}}}
            >
              ${this.t("license_copy")}
            </button>
          </div>`:w}
      <div class="fp3d-offer-grid">
        ${t.map(i=>v`<a class="fp3d-offer" href=${Si(i.url,n)} target="_blank" rel="noopener">
            ${i.image?v`<img src=${i.image} alt="" loading="lazy" />`:v`<div class="fp3d-offer-ph">✦</div>`}
            <div class="fp3d-offer-body">
              <b>${i.name}</b>
              ${i.new?v`<span class="fp3d-offer-new">${this.t("offers_new")}</span>`:w}
              <span class="fp3d-offer-kind">${this.t(`offers_kind_${i.kind}`)}${i.price?` \xB7 ${i.price}`:""}</span>
              ${i.teaser?v`<span class="fp3d-sub">${i.teaser}</span>`:w}
            </div>
          </a>`)}
      </div>
    </section>`)}renderShop(){let e=this._license;if(!this.isAdmin||!this.hass)return w;if(!e)return this.loadLicense(),w;let t=this.hass,n=this._licenseBusy,i=e.checked_at?new Date(e.checked_at*1e3).toLocaleString(t.language):null;return v`<div class="fp3d-shop fp3d-ext-card">
      <h3>${this.t("license_title")}</h3>
      <div class="fp3d-shop-row">
        <span>${this.t("license_instance")}</span>
        <code>${e.instance}</code>
        <button
          class="fp3d-btn"
          @click=${async()=>{try{await navigator.clipboard.writeText(e.instance),this._licenseMsg={ok:!0,text:this.t("license_copied")}}catch{}}}
        >
          ${this.t("license_copy")}
        </button>
      </div>
      ${e.active?v`<div class="fp3d-shop-row">
              <span>${this.t("license_active",{name:e.licensee??"",key:e.key_hint??""})}</span>
              ${i?v`<span class="fp3d-sub">${this.t("license_checked",{time:i})}</span>`:w}
              <button class="fp3d-btn" ?disabled=${!!n} @click=${()=>this.shopCall("refresh",()=>zi(t),this.t("license_refreshed"))}>
                ${n==="refresh"?"\u2026":this.t("license_refresh")}
              </button>
              <button class="fp3d-btn fp3d-danger" ?disabled=${!!n} @click=${()=>confirm(this.t("license_remove_confirm"))&&this.shopCall("remove",()=>Mi(t))}>
                ${this.t("license_remove")}
              </button>
            </div>
            ${e.error?v`<p class="fp3d-sub fp3d-pack-error">${this.t(`license_error_${e.error}`)}</p>`:w}
            ${e.packs.length?e.packs.map(s=>{let r=s.installed===null?"install":s.installed<s.release?"update":"installed";return v`<div class="fp3d-pack">
                    <div>
                      <b>${s.name}</b>
                      <span class="fp3d-sub">${r==="installed"?this.t("license_installed",{release:s.release}):r==="update"?this.t("license_update_available",{release:s.release}):this.t("license_not_installed")}</span>
                    </div>
                    ${r==="installed"?w:v`<button class="fp3d-btn fp3d-primary" ?disabled=${!!n} @click=${()=>this.installFromShop(s)}>
                          ${n===s.id?"\u2026":this.t(r==="update"?"license_update":"license_install")}
                        </button>`}
                  </div>`}):v`<p class="fp3d-sub">${this.t("license_none")}</p>`}`:v`<div class="fp3d-shop-row">
            <input
              type="text"
              class="fp3d-shop-key"
              placeholder="NP-XXXX-XXXX-XXXX-XXXX"
              autocomplete="off"
              spellcheck="false"
              .value=${this._licenseKey}
              @input=${s=>this._licenseKey=s.target.value}
              @keydown=${s=>{s.key==="Enter"&&this._licenseKey.trim()&&this.shopCall("activate",()=>nn(t,this._licenseKey),this.t("license_activated"))}}
            />
            <button class="fp3d-btn fp3d-primary" ?disabled=${!!n||!this._licenseKey.trim()} @click=${()=>this.shopCall("activate",()=>nn(t,this._licenseKey),this.t("license_activated"))}>
              ${n==="activate"?"\u2026":this.t("license_activate")}
            </button>
          </div>`}
      ${this._licenseMsg?v`<p class="fp3d-sub ${this._licenseMsg.ok?"fp3d-notice":"fp3d-pack-error"}">${this._licenseMsg.text}</p>`:w}
      <p class="fp3d-sub">${this.t("license_hint")} <a href=${e.shop_url} target="_blank" rel="noopener">${this.t("license_shop")}</a></p>
    </div>`}renderPacks(){let e=this.packs??[];return v`<section class="fp3d-ext-card">
      <h3>${this.t("packs")}</h3>
      ${e.map(t=>v`<div class="fp3d-pack">
          <div>
            <b>${t.name}</b>
            <span class="fp3d-sub">${t.features?.length?this.t("pack_features",{publisher:t.publisher,n:t.features.length}):this.t("pack_by",{publisher:t.publisher,n:t.items.length})}</span>
            ${t.licensee?v`<span class="fp3d-sub">${this.t("pack_licensed",{name:t.licensee})}${t.release&&t.release>1?` \xB7 v${t.release}`:""}</span>`:w}
          </div>
          <button class="fp3d-btn fp3d-danger" @click=${()=>this.deletePack(t)}>${this.t("pack_remove")}</button>
        </div>`)}

      <label class="fp3d-btn fp3d-primary fp3d-pack-import">
        ${this.t("pack_import")}
        <input type="file" accept=".fp3dpack,.json,application/json" multiple hidden @change=${t=>this.importPackFile(t)} />
      </label>
      ${this._packMsg?v`<p class="fp3d-sub ${this._packMsg.ok?"fp3d-notice":"fp3d-pack-error"}">${this._packMsg.text}</p>`:w}
      <p class="fp3d-sub">${this.t("packs_hint")}</p>
    </section>`}async importPackFile(e){let t=e.target,n=[...t.files??[]];if(t.value="",!n.length||!this.hass)return;let i=[],s=[];for(let a of n)try{let l=await vi(this.hass,await a.text());i.push(this.t("pack_imported",{name:l.name,publisher:l.publisher,n:l.items}))}catch(l){let{code:c,message:d}=l??{},h=`pack_error_${c}`,p=this.t(h,{detail:d??String(l)});s.push(`${a.name}: ${p===h?this.t("pack_error_other",{detail:d??String(l)}):p}`)}i.length&&this.dispatchEvent(new CustomEvent("packs-changed",{bubbles:!0,composed:!0}));let r=n.length>1?[this.t("packs_imported_n",{n:i.length,total:n.length})]:[];this._packMsg={ok:s.length===0,text:[...r,...i,...s].join(" \xB7 ")}}async deletePack(e){!this.hass||!confirm(this.t("pack_remove_confirm",{name:e.name}))||(await yi(this.hass,e.id),this._packMsg=null,this.dispatchEvent(new CustomEvent("packs-changed",{bubbles:!0,composed:!0})))}static styles=[Ne,Ht,oe`
      .fp3d-updates {
        border-color: color-mix(in srgb, var(--fp3d-accent) 60%, transparent);
        background: color-mix(in srgb, var(--fp3d-accent) 8%, transparent);
      }
      .fp3d-updates p {
        margin: 4px 0;
      }
      .fp3d-loyalty {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin: 6px 0 12px;
        padding: 10px 12px;
        border: 1px solid color-mix(in srgb, #ffb547 55%, transparent);
        border-radius: 12px;
        background: color-mix(in srgb, #ffb547 10%, transparent);
      }
      .fp3d-loyalty code {
        font-size: 1.05em;
        font-weight: 700;
        letter-spacing: 0.04em;
      }
      .fp3d-offer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 10px;
      }
      .fp3d-offer {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
        color: inherit;
        text-decoration: none;
        background: color-mix(in srgb, var(--fp3d-accent) 4%, transparent);
      }
      .fp3d-offer:hover {
        border-color: var(--fp3d-accent);
      }
      .fp3d-offer img,
      .fp3d-offer-ph {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
      }
      .fp3d-offer-ph {
        display: grid;
        place-items: center;
        font-size: 28px;
        color: var(--fp3d-accent);
      }
      .fp3d-offer-body {
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 10px 12px;
      }
      .fp3d-offer-new {
        align-self: flex-start;
        padding: 1px 8px;
        border-radius: 999px;
        background: #ffb547;
        color: #1a1200;
        font-size: 11px;
        font-weight: 700;
      }
      .fp3d-offer-kind {
        color: var(--fp3d-accent);
        font-size: 12px;
      }
      :host {
        display: block;
        overflow: auto;
      }
      .fp3d-ext {
        max-width: 920px;
        margin: 0 auto;
        padding: 20px 16px 40px;
        display: grid;
        gap: 16px;
      }
      .fp3d-ext-head {
        display: grid;
        gap: 8px;
        justify-items: start;
      }
      .fp3d-ext-head a {
        text-decoration: none;
      }
      .fp3d-ext-actions,
      .fp3d-ext-links {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }
      .fp3d-ext-head h2 {
        margin: 0;
        font-size: 22px;
      }
      .fp3d-ext-card {
        padding: 14px 16px;
        border: 1px solid var(--fp3d-line);
        border-radius: 14px;
        background: var(--fp3d-chrome);
      }
      .fp3d-ext-card h3 {
        margin: 0 0 8px;
        font-size: 13px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--fp3d-soft);
      }
      .fp3d-ext-pro {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 10px;
      }
      .fp3d-ext-feature {
        display: grid;
        gap: 6px;
        align-content: start;
        padding: 12px;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
      }
      .fp3d-ext-on {
        border-color: var(--fp3d-accent);
      }
      .fp3d-ext-state {
        color: var(--fp3d-accent);
        font-weight: 600;
        font-size: 13px;
      }
      .fp3d-ext-link {
        color: var(--fp3d-accent);
        font-weight: 600;
        font-size: 13px;
      }
      .fp3d-sub {
        color: var(--fp3d-soft);
        font-size: 13px;
      }
      .fp3d-notice {
        color: var(--fp3d-accent);
      }
      .fp3d-shop {
        margin: 10px 0;
        padding: 10px 12px;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
      }
      .fp3d-shop-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin: 6px 0;
      }
      .fp3d-shop code {
        padding: 2px 8px;
        border-radius: 6px;
        background: var(--fp3d-chrome-solid);
        font-size: 13px;
        letter-spacing: 0.08em;
        user-select: all;
      }
      .fp3d-shop-key {
        flex: 1;
        min-width: 180px;
        font-family: ui-monospace, monospace;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .fp3d-shop a {
        color: var(--fp3d-accent);
      }
      .fp3d-pack {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 0;
        border-bottom: 1px solid var(--fp3d-line);
      }
      .fp3d-pack div {
        display: grid;
        gap: 2px;
      }
      .fp3d-pack-import {
        display: block;
        margin-top: 10px;
        text-align: center;
        cursor: pointer;
      }
      .fp3d-pack-error {
        color: var(--fp3d-danger);
      }
    `]};customElements.get("fp3d-extensions")||customElements.define("fp3d-extensions",Xn);var hr=new Set(["vertex","room","device","opening","furniture","rotate","resize","outdoor","roofmove","roofcorner","outvertex","solarmove","solarturn","cablept"]),ur=100,Vt=10,M=o=>Math.round(o*1e3)/1e3,pr={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},Zn=class extends ne{static properties={hass:{attribute:!1},building:{attribute:!1},narrow:{type:Boolean},packs:{attribute:!1},_preview:{state:!0},_doc:{state:!0},_doc3d:{state:!0},_split:{state:!0},_splitRatio:{state:!0},_backupBusy:{state:!0},_wall3d:{state:!0},_sidePinned:{state:!0},_sideOpen:{state:!0},_floorId:{state:!0},_roomId:{state:!0},_vertex:{state:!0},_openingId:{state:!0},_furnitureId:{state:!0},_deviceId:{state:!0},_deviceQuery:{state:!0},_devSource:{state:!0},_roofId:{state:!0},_solarId:{state:!0},_solarPick:{state:!0},_roofWinId:{state:!0},_energyNote:{state:!0},_cableId:{state:!0},_furnQuery:{state:!0},_libOpen:{state:!0},_expanded:{state:!0},_notice:{state:!0},_history:{state:!0},_spots:{state:!0},_outdoorId:{state:!0},_wallId:{state:!0},_edgeHi:{state:!0},_ctx:{state:!0},_fixedHint:{state:!0},_floorMenu:{state:!0},_openingPreset:{state:!0},_measureLen:{state:!0},_packages:{state:!0},_rectSize:{state:!0},_tool:{state:!0},_draft:{state:!0},_cursor:{state:!0},_guides:{state:!0},_view:{state:!0},_size:{state:!0},_images:{state:!0},_canUndo:{state:!0},_canRedo:{state:!0}};doc3dTimer;cableCache=null;fixedPan=!1;reframe3d=!1;pressTimer=0;pressStart=null;past=[];future=[];drag=null;pointers=new Map;pinch=null;fitted=!1;resizeObserver;loadingImages=new Set;constructor(){super(),this.narrow=!1,this._floorId=null,this._roomId=null,this._vertex=null,this._openingId=null,this._furnitureId=null,this._deviceId=null,this._deviceQuery="",this._devSource="area",this._roofId=null,this._solarId=null,this._solarPick=!1,this._roofWinId=null,this._energyNote=null,this._cableId=null,this._furnQuery="",this._libOpen=new Set(["group:lights","group:living"]);try{let n=localStorage.getItem("neonplan3d.library");n&&(this._libOpen=new Set(JSON.parse(n)))}catch{}this._expanded=new Set,this._notice=null,this._history=null,this._spots=null,this._outdoorId=null,this._wallId=null,this._edgeHi=null,this._floorMenu=!1,this._openingPreset="door";let e=!1;try{e=localStorage.getItem("neonplan3d.editor3d")==="1"}catch{}this._split=e,this._splitRatio=.55;try{let n=Number(localStorage.getItem("neonplan3d.editorSplit"));n>=20&&n<=80&&(this._splitRatio=n/100)}catch{}this._backupBusy=!1,this._wall3d="cut",this._doc3d=this._doc,this._sideOpen=!1;let t=!0;try{t=localStorage.getItem("neonplan3d.sidePinned")!=="0"}catch{}this._sidePinned=t,this._preview=null,this._measureLen=3,this._packages=!1,this._rectSize=[4,3],this._tool="select",this._draft=[],this._cursor=null,this._guides={},this._view={scale:50,ox:40,oy:40},this._size={w:800,h:600},this._images={},this._canUndo=!1,this._canRedo=!1}t(e,t){return Fe(this.hass,e,t)}connectedCallback(){super.connectedCallback(),window.addEventListener("keydown",this.onKey)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("keydown",this.onKey),this.resizeObserver?.disconnect()}willUpdate(e){e.has("packs")&&Ri(this.packs??[]),e.has("_doc")&&this._split&&this.queue3d(),e.has("_split")&&this._split&&(this._doc3d=this._doc),e.has("_tool")&&this.houseTool&&!this._split&&!this.narrow&&(this._split=!0),e.has("_tool")&&(this.houseTool||e.get("_tool")==="roof"||e.get("_tool")==="energy")&&(this.reframe3d=!0),e.has("building")&&this.building!==this._doc&&(this._doc=this.building,this._doc3d=this.building,this._doc.floors.some(t=>t.id===this._floorId)||(this._floorId=this._doc.floors[0]?.id??null),this.floor?.rooms.some(t=>t.id===this._roomId)||(this._roomId=null))}firstUpdated(){let e=this.renderRoot.querySelector(".fp3d-canvas-wrap");this.resizeObserver=new ResizeObserver(()=>{this._size={w:e.clientWidth,h:e.clientHeight},!this.fitted&&this._size.w>0&&(this.fitted=!0,this.fit())}),this.resizeObserver.observe(e)}queue3d(){clearTimeout(this.doc3dTimer),this.doc3dTimer=setTimeout(()=>this._doc3d=this._doc,150)}onSplitDown(e){let t=e.currentTarget.parentElement,n=e.currentTarget;n.setPointerCapture(e.pointerId);let i=t.getBoundingClientRect(),s=a=>{this._splitRatio=Math.min(.8,Math.max(.2,(a.clientX-i.left)/i.width))},r=()=>{n.removeEventListener("pointermove",s),n.removeEventListener("pointerup",r),n.removeEventListener("pointercancel",r);try{localStorage.setItem("neonplan3d.editorSplit",String(Math.round(this._splitRatio*100)))}catch{}};n.addEventListener("pointermove",s),n.addEventListener("pointerup",r),n.addEventListener("pointercancel",r),e.preventDefault()}toggleSplit(){this._split=!this._split;try{localStorage.setItem("neonplan3d.editor3d",this._split?"1":"0")}catch{}}onFurnitureMoved3d(e){let{id:t,x:n,z:i}=e.detail,s=this._doc.settings.wall_interior;this.change(r=>{for(let a of r.floors){let l=a.furniture.find(p=>p.id===t);if(!l)continue;let[c,d]=An(a,l.x,l.z,n,i);Object.assign(l,{x:c,z:d});let h=Et(a,l,s);h&&Object.assign(l,h)}})}onDeviceMoved3d(e){let{id:t,x:n,z:i}=e.detail;this.change(s=>{for(let r of s.floors){let a=r.placements.find(d=>d.entity_id===t);if(!a)continue;let[l,c]=An(r,a.x,a.z,n,i);Object.assign(a,{x:l,z:c})}})}render3dBar(){if(!this.isAdmin)return w;let e=this.furnitureItem,t=this.device;if(e){let n=hn(e),i=(s,r,a=.05)=>v`<label class="fp3d-3d-size" title=${this.t(`size_${s}`)}
        >${r}
        <input
          type="number"
          inputmode="decimal"
          step="0.05"
          min=${a}
          .value=${String(Math.round(e[s]*100)/100)}
          @change=${l=>{let c=parseFloat(l.target.value.replace(",","."));Number.isFinite(c)&&c>=a&&this.updateFurniture({[s]:Math.round(c*1e3)/1e3})}}
        />
      </label>`;return v`<div class="fp3d-3d-bar">
        <span>${mt(this.hass,e.type)}</span>
        ${i("w",this.t("size_short_w"))} ${i("d",this.t("size_short_d"))} ${i("h",this.t("size_short_h"))}
        ${n?v`<label class="fp3d-3d-size" title=${this.t("mount_height")}
              >↕
              <input
                type="number"
                inputmode="decimal"
                step="0.05"
                min="0"
                .value=${String(Math.round((e.mount_y??an(this.floor,e))*100)/100)}
                @change=${s=>{let r=parseFloat(s.target.value.replace(",","."));Number.isFinite(r)&&r>=0&&this.updateFurniture({mount_y:Math.round(r*1e3)/1e3})}}
              />
            </label>`:w}
        <button class="fp3d-chip" @click=${()=>this.rotateFurniture(-45)}>↺ 45°</button>
        <button class="fp3d-chip" @click=${()=>this.rotateFurniture(45)}>↻ 45°</button>
        ${this.fixButton("furniture",e.id)}
        <button class="fp3d-chip fp3d-danger-chip" @click=${()=>this.deleteFurniture()}>${this.t("delete")}</button>
      </div>`}if(t){let n=V(t.entity_id),i=n==="light",s=n?$n(n,this.floor?.height??2.5,i?t.mount??"ceiling":null):1;return v`<div class="fp3d-3d-bar">
        <span>${Z(this.hass,t.entity_id)}</span>
        ${i?v`<select class="fp3d-3d-select" title=${this.t("lamp_mount")} @change=${r=>this.updateDevice({mount:r.target.value,y:null})}>
              ${["ceiling","floor","table","wall"].map(r=>v`<option value=${r} ?selected=${r===(t.mount??"ceiling")}>${this.t(`lamp_${r}`)}</option>`)}
            </select>`:w}
        <label class="fp3d-3d-size" title=${this.t("marker_height")}
          >${this.t("size_short_h")}
          <input
            type="number"
            inputmode="decimal"
            step="0.05"
            min="0"
            .value=${String(Math.round((t.y??s)*100)/100)}
            @change=${r=>{let a=parseFloat(r.target.value.replace(",","."));Number.isFinite(a)&&a>=0&&this.updateDevice({y:Math.round(a*1e3)/1e3})}}
          />
        </label>
        <button class="fp3d-chip" @click=${()=>this.updateDevice({rotation:(((t.rotation??0)-45)%360+360)%360})}>↺ 45°</button>
        <button class="fp3d-chip" @click=${()=>this.updateDevice({rotation:((t.rotation??0)+45)%360%360})}>↻ 45°</button>
        ${this.fixButton("device",t.entity_id)}
        <button class="fp3d-chip fp3d-danger-chip" @click=${()=>this.deleteItem("device",t.entity_id)}>${this.t("delete")}</button>
      </div>`}return w}grab3d=null;surfaceGrabber={start:e=>this.grab3dStart(e),move:e=>this.grab3dMove(e),end:()=>{let e=this.grab3d;this.grab3d=null,e?.moved&&this.pushHistory(e.base)}};grab3dStart(e){let t=this._doc,n=q(t),i=null,s=(a,l,c,d,h=!1)=>{if(!c||h)return;let p=Cn(c,e.o,e.d);!p||!Us(c,d,p.u,p.s)||i&&i.t<=p.t||(i={id:a,win:l,t:p.t,du:p.u-d.u,ds:p.s-d.v})};if(this._tool==="energy")for(let a of t.settings.roof.solar??[])s(a.id,!1,te(t,a,n),a,!!a.locked);if(this._tool==="roof")for(let a of t.settings.roof.windows??[])s(a.id,!0,n.find(l=>l.key===a.face)??null,Be(a),!!a.locked);if(!i)return!1;let r=i;return this.grab3d={id:r.id,win:r.win,du:r.du,ds:r.ds,base:t,moved:!1},r.win?this._roofWinId=r.id:this.selectSolar(r.id),!0}grab3dMove(e){let t=this.grab3d;if(!t)return;let n=t.base,i=t.win?n.settings.roof.windows?.find(g=>g.id===t.id):void 0,s=t.win?i?Be(i):void 0:n.settings.roof.solar?.find(g=>g.id===t.id);if(!s)return;let r=te(n,s),a=r?.unbounded?[r]:t.win?q(n):[...q(n),...de(n)],l=null;for(let g of a){let f=Cn(g,e.o,e.d);f&&js(g,f.u,f.s)&&(!l||f.t<l.t)&&(l={face:g,...f})}if(!l)return;let c=l.face,d=.05,h=g=>M(Math.round(g/d)*d),p=ct(c,{...s,face:c.key,u:h(l.u-t.du),v:h(l.s-t.ds),tilt:c.flat?s.tilt??15:s.tilt});t.moved=!0,this.change(g=>{if(t.win){let u=g.settings.roof.windows?.find(y=>y.id===t.id);u&&Object.assign(u,{face:c.key,...p});return}let f=g.settings.roof.solar?.find(u=>u.id===t.id);f&&Object.assign(f,{face:c.key,...p},c.flat&&f.tilt==null?{tilt:15}:{})},t.base,!1)}get houseTool(){return this._tool==="roof"||this._tool==="energy"}render3d(){return v`<div class="fp3d-editor-3d">
      ${this.houseTool?w:v`<div class="fp3d-seg fp3d-3d-walls">
            <button aria-pressed=${this._wall3d==="auto"} @click=${()=>this._wall3d="auto"}>${this.t("walls_auto")}</button>
            <button aria-pressed=${this._wall3d==="cut"} @click=${()=>this._wall3d="cut"}>${this.t("walls_cut")}</button>
          </div>`}
      ${this.render3dBar()}
      <fp3d-view3d
        .hass=${this.hass}
        .building=${this._doc3d}
        .floorId=${this.houseTool?null:this._floorId}
        .roomId=${null}
        .wallMode=${this.houseTool?"auto":this._wall3d}
        .explode=${!1}
        .markerMode=${"important"}
        .heatMode=${"none"}
        .theme=${"neon"}
        .packs=${this.packs}
        .showEnergy=${!1}
        .flows=${!1}
        ?furnish=${this.isAdmin}
        .surfaceGrab=${this.isAdmin&&this.houseTool?this.surfaceGrabber:null}
        .furnishTypes=${this._tool==="energy"?xe:this._tool==="roof"?[]:null}
        .selectedFurniture=${this._furnitureId}
        .selectedDevice=${this._deviceId}
        .quality=${"auto"}
        .floorThumbs=${!1}
        .roomLabels=${!0}
        .floorStack=${this.houseTool?"stacked":"single"}
        .panelOpen=${!1}
        .alerts=${!1}
        .scenes=${!1}
        @furniture-select=${e=>{e.detail.id?this.selectFrom3d("furniture",e.detail.id):this._furnitureId&&this.selectFrom3d("furniture",null)}}
        @furniture-move=${this.onFurnitureMoved3d}
        @device-select=${e=>{e.detail.id?this.selectFrom3d("device",e.detail.id):this._deviceId&&this.selectFrom3d("device",null)}}
        @device-move=${this.onDeviceMoved3d}
        @floor-tap=${e=>{e.detail.floorId&&(this._floorId=e.detail.floorId),this._sideOpen=!1}}
        @room-tap=${e=>{e.detail.floorId&&(this._floorId=e.detail.floorId),e.detail.roomId?this.selectFrom3d("room",e.detail.roomId):this._sideOpen=!1}}
      ></fp3d-view3d>
    </div>`}updated(){this.reframe3d&&(this.reframe3d=!1,setTimeout(()=>this.renderRoot.querySelector("fp3d-view3d")?.resetView(),250));let e=this.floor?.background;if(e&&!this._images[e.image_id]&&!this.loadingImages.has(e.image_id)&&this.loadImage(e.image_id),this.furnitureItem?.pictures)for(let t of this.storedPictures())!this._images[t]&&!this.loadingImages.has(t)&&this.loadImage(t)}get floor(){return this._doc?.floors.find(e=>e.id===this._floorId)}get room(){return this.floor?.rooms.find(e=>e.id===this._roomId)}get isAdmin(){return this.hass?.user?.is_admin??!0}setDoc(e,t=this._doc){t&&(this.past.push(JSON.stringify(t)),this.past.length>ur&&this.past.shift(),this.future=[]),this._doc=e,this._canUndo=this.past.length>0,this._canRedo=this.future.length>0,this.dispatchEvent(new CustomEvent("building-changed",{detail:{building:e},bubbles:!0,composed:!0}))}change(e,t=this._doc,n=!0){let i=structuredClone(t),s=i.floors.find(r=>r.id===this._floorId);!s&&this._floorId||(e(i,s),this.setDoc(i,n?t:null))}undo(){let e=this.past.pop();e&&(this.future.push(JSON.stringify(this._doc)),this.restore(JSON.parse(e)))}redo(){let e=this.future.pop();e&&(this.past.push(JSON.stringify(this._doc)),this.restore(JSON.parse(e)))}restore(e){this._doc=e,e.floors.some(t=>t.id===this._floorId)||(this._floorId=e.floors[0]?.id??null),this.floor?.rooms.some(t=>t.id===this._roomId)||(this._roomId=null),this._vertex=null,this._canUndo=this.past.length>0,this._canRedo=this.future.length>0,this.dispatchEvent(new CustomEvent("building-changed",{detail:{building:e},bubbles:!0,composed:!0}))}toScreen(e){let{scale:t,ox:n,oy:i}=this._view;return[e[0]*t+n,e[1]*t+i]}toWorld(e,t){let{scale:n,ox:i,oy:s}=this._view;return[(e-i)/n,(t-s)/n]}localPoint(e){let t=this.renderRoot.querySelector("svg").getBoundingClientRect();return[e.clientX-t.left,e.clientY-t.top]}fit(){let e=this.floor?.rooms.flatMap(a=>a.points)??[],t=e.length?ie(e):{x0:0,z0:0,x1:10,z1:8},n=1.5,i=t.x1-t.x0+2*n,s=t.z1-t.z0+2*n,r=Math.max(8,Math.min(400,Math.min(this._size.w/i,this._size.h/s)));this._view={scale:r,ox:this._size.w/2-(t.x0+t.x1)/2*r,oy:this._size.h/2-(t.z0+t.z1)/2*r}}showPoint(e,t){let n=Math.max(this._view.scale,70);this._view={scale:n,ox:this._size.w/2-e*n,oy:this._size.h/2-t*n}}zoomAt(e,t,n){let{scale:i,ox:s,oy:r}=this._view,a=Math.max(8,Math.min(600,i*e)),l=a/i;this._view={scale:a,ox:t-(t-s)*l,oy:n-(n-r)*l}}snap(e,t,n=!1){if(this._guides={},n)return e;let i=Vt/this._view.scale,s=this.floor?.rooms??[],r=[];for(let f of s)f.points.forEach((u,y)=>{t&&f.id===t.roomId&&(t.index===void 0||t.index===y)||r.push(u)});let a=null,l=i;for(let f of r){let u=Math.hypot(f[0]-e[0],f[1]-e[1]);u<l&&(l=u,a=f)}if(a)return this._guides={point:a},[a[0],a[1]];for(let f of s)if(!(t&&f.id===t.roomId))for(let u=0;u<f.points.length;u++){let y=f.points[u],b=f.points[(u+1)%f.points.length],m=b[0]-y[0],_=b[1]-y[1],k=m*m+_*_;if(k<1e-9)continue;let $=((e[0]-y[0])*m+(e[1]-y[1])*_)/k;if($<=0||$>=1)continue;let S=[y[0]+$*m,y[1]+$*_],z=Math.hypot(S[0]-e[0],S[1]-e[1]),A=this._doc.settings.grid;Math.abs(_)<1e-9&&(S[0]=Math.min(Math.max(Math.round(S[0]/A)*A,Math.min(y[0],b[0])),Math.max(y[0],b[0]))),Math.abs(m)<1e-9&&(S[1]=Math.min(Math.max(Math.round(S[1]/A)*A,Math.min(y[1],b[1])),Math.max(y[1],b[1]))),z<l&&(l=z,a=S)}if(a)return this._guides={point:a},[M(a[0]),M(a[1])];let c=this._doc.settings.grid,d=[M(Math.round(e[0]/c)*c),M(Math.round(e[1]/c)*c)],h=i,p=i,g={};for(let f of r)Math.abs(f[0]-e[0])<h&&(h=Math.abs(f[0]-e[0]),d[0]=f[0],g.x=f[0]),Math.abs(f[1]-e[1])<p&&(p=Math.abs(f[1]-e[1]),d[1]=f[1],g.z=f[1]);return this._guides=g,d}onPointerDown(e){if(this._ctx=null,this._fixedHint=!1,this.fixedPan=!1,this.pointerDown(e),this.pointers.size!==1){clearTimeout(this.pressTimer);return}if(this.guardFixed(this.localPoint(e)),clearTimeout(this.pressTimer),this.pressStart=null,e.pointerType==="touch"&&(this._tool==="select"||this._tool==="furniture")){let t=this.localPoint(e),n=e.target;this.pressStart=t,this.pressTimer=window.setTimeout(()=>{let i=this.drag;i&&"moved"in i&&i.moved||(this.drag=null,this.openContext(n,t))},550)}}guardFixed(e){let t=this.drag;if(!t)return;let n=null;t.kind==="vertex"||t.kind==="room"?n=["room",t.roomId]:t.kind==="device"||t.kind==="aim"?n=["device",t.entityId]:t.kind==="opening"?n=["opening",t.id]:t.kind==="furniture"||t.kind==="rotate"||t.kind==="resize"?n=["furniture",t.id]:t.kind==="wallmove"?n=["wall",t.id]:t.kind==="outdoor"&&(n=["outdoor",t.id]),!(!n||!this.isFixedItem(...n))&&("moved"in t&&t.moved&&"base"in t&&this.restoreLive(t.base),this.drag={kind:"pan",last:e},this.fixedPan=!0)}pointerDown(e){e.currentTarget.setPointerCapture(e.pointerId);let n=this.localPoint(e);if(this.pointers.set(e.pointerId,n),this.pointers.size===2){this.drag&&hr.has(this.drag.kind)&&"moved"in this.drag&&this.drag.moved&&"base"in this.drag&&this.restoreLive(this.drag.base),this.drag=null,this.pinch=this.pinchState();return}if(this.pointers.size>2)return;if(e.button===1||e.button===2||!this.floor){this.drag={kind:"pan",last:n};return}let i=this.toWorld(...n),s=e.target;if(this._tool==="wall"){let _=this.snap(i,void 0,e.altKey);this.drag={kind:"freewall",start:_,end:_};return}if(this._tool==="roof"||this._tool==="energy"){let _=s.closest("[data-roof-corner]")?.getAttribute("data-roof-corner"),k=s.closest("[data-roof]")?.getAttribute("data-roof"),$=this._tool==="energy"?s.closest("[data-energy-device]")?.getAttribute("data-energy-device"):null;if($){this._solarId=null,this.selectItem("furniture",$),this.drag=this.isAdmin?{kind:"furniture",id:$,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}if(this._tool==="energy"){let x=s.closest("[data-cable-pt]")?.getAttribute("data-cable-pt"),E=P=>!!this._doc.settings.roof.cables?.find(O=>O.id===P)?.locked;if(x&&this.isAdmin&&!E(x.slice(0,x.lastIndexOf(":")))){let P=x.lastIndexOf(":"),O=x.slice(0,P),N=Number(x.slice(P+1));if(e.detail>=2){this.change(B=>{let L=B.settings.roof.cables?.find(U=>U.id===O);L&&L.points.length>1&&L.points.splice(N,1)}),this.drag={kind:"pan",last:n};return}this.drag={kind:"cablept",id:O,index:N,base:this._doc,moved:!1};return}let R=s.closest("[data-cable-line]")?.getAttribute("data-cable-line");if(R&&this.isAdmin&&!E(R)){let P=Number(s.closest("[data-cable-line]")?.getAttribute("data-cable-seg")??0),O=this._doc;this.change(N=>{let B=N.settings.roof.cables?.find(L=>L.id===R);B&&B.points.splice(P,0,[M(i[0]),M(i[1])])}),this.drag={kind:"cablept",id:R,index:P,base:O,moved:!0};return}let T=s.closest("[data-cable]")?.getAttribute("data-cable");if(T){if(this._cableId=T,this.isAdmin&&this._floorId&&!this._doc.settings.roof.cables?.some(P=>P.id===T)){let P=this._doc;this.layCable(T);let O=this._doc.settings.roof.cables?.find(B=>B.id===T),N=this.cableSegments().filter(B=>B.key===T);if(O&&N.length){let B=[[N[0].a[0],N[0].a[2]],...O.points,[N[N.length-1].b[0],N[N.length-1].b[2]]],L=0,U=1/0;for(let W=0;W+1<B.length;W++){let K=Po(i,B[W],B[W+1]);K<U&&(U=K,L=W)}this.change(W=>{let K=W.settings.roof.cables?.find(J=>J.id===T);K&&K.points.splice(L,0,[M(i[0]),M(i[1])])}),this.drag={kind:"cablept",id:T,index:L,base:P,moved:!0};return}}this.drag={kind:"pan",last:n};return}}let S=this._tool==="energy"?s.closest("[data-solar]")?.getAttribute("data-solar"):null,z=this._tool==="energy"?s.closest("[data-solar-turn]")?.getAttribute("data-solar-turn"):null;if(z&&this.isAdmin){this.drag={kind:"solarturn",id:z,base:this._doc,moved:!1};return}if(S){let x=s.closest("[data-cell]")?.getAttribute("data-cell");if(this._solarPick&&S===this._solarId&&x&&this.isAdmin){this.toggleSolarCell(x),this.drag={kind:"pan",last:n};return}S!==this._solarId&&(this._solarPick=!1),this._solarId=S,this._roofId=null;let E=this._doc.settings.roof.solar?.find(O=>O.id===S),R=E?te(this._doc,E)??void 0:void 0,T=R?this.faceHit(R,i):null,P=E&&T?{du:T.u-E.u,ds:Number.isNaN(T.s)?0:T.s-E.v}:null;this.drag=this.isAdmin&&!E?.locked?{kind:"solarmove",id:S,start:i,startScreen:n,base:this._doc,moved:!1,grab:P}:{kind:"pan",last:n};return}let A=this._tool==="roof"?s.closest("[data-roofwin]")?.getAttribute("data-roofwin"):null;if(A){this._roofWinId=A,this._roofId=null;let x=this._doc.settings.roof.windows?.find(P=>P.id===A),E=x?q(this._doc).find(P=>P.key===x.face):void 0,R=E?Ot(E,i):null,T=x&&R?{du:R.u-x.u,ds:R.s-x.v}:null;this.drag=this.isAdmin&&!x?.locked?{kind:"solarmove",id:A,start:i,startScreen:n,base:this._doc,moved:!1,grab:T,win:!0}:{kind:"pan",last:n};return}this._tool==="roof"&&(this._roofWinId=null);let I=this._tool==="energy"?s.closest(".fp3d-energy-item")?.getAttribute("data-furniture"):null;if(I){this._solarId=null,this.selectItem("furniture",I),this.drag=this.isAdmin?{kind:"furniture",id:I,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}if(this._tool==="energy"){this.selectItem("furniture",null),this._solarId=null,this.drag={kind:"pan",last:n};return}if(_&&this.isAdmin){let[x,E,R]=_.split(":");this.drag={kind:"roofcorner",id:x,corner:[E==="1"?1:0,R==="1"?1:0],base:this._doc,moved:!1}}else if(k){let x=this.roofFixed(this._doc.settings.roof.sections?.find(E=>E.id===k));x&&this._roofId===k&&(this._fixedHint=!0),this._roofId=k,this.drag=this.isAdmin&&!x?{kind:"roofmove",id:k,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n}}else if(this.isAdmin){this._roofId=null;let x=this.snap(i,void 0,e.altKey);this.drag={kind:"rect",start:x,end:x,roof:!0}}else this.drag={kind:"pan",last:n};return}if(this._tool==="rect"||this._tool==="outdoor"||this._tool==="hole"){let _=this.snap(i,void 0,e.altKey);this.drag={kind:"rect",start:_,end:_,outdoor:this._tool==="outdoor",hole:this._tool==="hole"};return}if(this._tool==="polygon"||this._tool==="measure"){this.drag={kind:"tap",startScreen:n,last:n,panning:!1};return}if(this._tool==="opening"){this.placeOpening(this._openingPreset,n)||(this.drag={kind:"pan",last:n});return}let r=s.closest("[data-device]");if(r&&this.isAdmin){this.drag={kind:"device",entityId:r.getAttribute("data-device"),start:i,startScreen:n,base:this._doc,moved:!1};return}let a=s.closest("[data-opening]");if(a){let _=a.getAttribute("data-opening");this.selectItem("opening",_),this.drag=this.isAdmin?{kind:"opening",id:_,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}let l=s.closest("[data-resize]");if(l&&this.isAdmin){let[_,k,$]=l.getAttribute("data-resize").split(":");this.drag={kind:"resize",id:_,corner:[k==="1"?1:-1,$==="1"?1:-1],base:this._doc,moved:!1};return}let c=s.closest("[data-rotate]");if(c&&this.isAdmin){this.drag={kind:"rotate",id:c.getAttribute("data-rotate"),base:this._doc,moved:!1};return}let d=s.closest("[data-aim]");if(d&&this.isAdmin){this.drag={kind:"aim",entityId:d.getAttribute("data-aim"),base:this._doc,moved:!1};return}let h=s.closest("[data-furniture]");if(h&&!s.closest("[data-vertex], [data-mid]")){let _=h.getAttribute("data-furniture");this.selectItem("furniture",_),this.drag=this.isAdmin?{kind:"furniture",id:_,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}let p=s.closest("[data-vertex]"),g=s.closest("[data-mid]");if(p&&this.room&&this.isAdmin){this._vertex=Number(p.getAttribute("data-vertex")),this.drag={kind:"vertex",roomId:this.room.id,index:this._vertex,base:this._doc,moved:!1};return}if(g&&this.room&&this.isAdmin){let _=Number(g.getAttribute("data-mid")),k=this.room.points,$=k[_],S=k[(_+1)%k.length],z=[M(($[0]+S[0])/2),M(($[1]+S[1])/2)],A=this._doc,I=this.room.id;this.change((x,E)=>{let R=E.rooms.find(P=>P.id===I);R.points.splice(_+1,0,z),R.wall_heights&&R.wall_heights.splice(_+1,0,R.wall_heights[_]??null);let T=Math.hypot(z[0]-$[0],z[1]-$[1]);for(let P of E.openings)P.room_id!==I||P.wall||(P.edge>_?P.edge+=1:P.edge===_&&P.offset>T&&(P.edge=_+1,P.offset=M(P.offset-T)))},A,!1),this._vertex=_+1,this.drag={kind:"vertex",roomId:I,index:_+1,base:A,moved:!0};return}let f=s.closest("[data-wall-end]");if(f&&this.isAdmin){let[_,k]=f.getAttribute("data-wall-end").split(":");this.drag={kind:"wallmove",id:_,end:k,start:i,startScreen:n,base:this._doc,moved:!1};return}let u=s.closest("[data-free-wall]");if(u){let _=u.getAttribute("data-free-wall");this.selectItem("wall",_),this.drag=this.isAdmin?{kind:"wallmove",id:_,end:null,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}let y=s.closest("[data-out-vertex]");if(y&&this.isAdmin){let[_,k]=y.getAttribute("data-out-vertex").split(":");this.drag={kind:"outvertex",id:_,index:Number(k),base:this._doc,moved:!1};return}let b=s.closest("[data-outdoor]");if(b&&!s.closest("[data-room]")&&!this.roomAt(i)){let _=b.getAttribute("data-outdoor");this.selectItem("outdoor",_),this.drag=this.isAdmin?{kind:"outdoor",id:_,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}let m=s.closest("[data-room]")?.getAttribute("data-room")??this.roomAt(i);if(m){m!==this._roomId&&(this._vertex=null),this.selectItem("room",m),this.drag=this.isAdmin&&this._tool!=="furniture"?{kind:"room",roomId:m,start:i,startScreen:n,base:this._doc,moved:!1}:{kind:"pan",last:n};return}this.selectItem("room",null),this.drag={kind:"pan",last:n}}onPointerMove(e){if(this.pressStart){let s=this.localPoint(e);Math.hypot(s[0]-this.pressStart[0],s[1]-this.pressStart[1])>8&&(clearTimeout(this.pressTimer),this.pressStart=null,this.fixedPan&&(this._fixedHint=!0))}else this.fixedPan&&!this._fixedHint&&this.drag?.kind==="pan"&&(this._fixedHint=!0);let t=this.localPoint(e);if(this.pointers.has(e.pointerId)&&this.pointers.set(e.pointerId,t),this.pinch){let s=this.pinchState();s&&(this.zoomAt(s.dist/Math.max(1,this.pinch.dist),...s.mid),this._view={...this._view,ox:this._view.ox+s.mid[0]-this.pinch.mid[0],oy:this._view.oy+s.mid[1]-this.pinch.mid[1]},this.pinch=s);return}let n=this.toWorld(...t),i=this.drag;if(!i){this._tool!=="select"&&this._tool!=="furniture"&&this.floor&&(this._cursor=this.snap(n,void 0,e.altKey));return}switch(i.kind){case"pan":this._view={...this._view,ox:this._view.ox+t[0]-i.last[0],oy:this._view.oy+t[1]-i.last[1]},i.last=t;break;case"tap":(i.panning||Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])>6)&&(i.panning=!0,this._view={...this._view,ox:this._view.ox+t[0]-i.last[0],oy:this._view.oy+t[1]-i.last[1]}),i.last=t;break;case"rect":i.end=this.snap(n,void 0,e.altKey),this.requestUpdate();break;case"freewall":{let s=this.snap(n,void 0,e.altKey);e.shiftKey&&(s=Math.abs(s[0]-i.start[0])>Math.abs(s[1]-i.start[1])?[s[0],i.start[1]]:[i.start[0],s[1]]),i.end=s,this.requestUpdate();break}case"wallmove":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=(i.base.floors.find(a=>a.id===this._floorId)?.walls??[]).find(a=>a.id===i.id);if(!s)return;let r;if(i.end){let a=this.snap(n,void 0,e.altKey);r=i.end==="a"?{a,b:s.b}:{a:s.a,b:a}}else{let a=e.altKey?.01:this._doc.settings.grid,l=Math.round((n[0]-i.start[0])/a)*a,c=Math.round((n[1]-i.start[1])/a)*a;r={a:[M(s.a[0]+l),M(s.a[1]+c)],b:[M(s.b[0]+l),M(s.b[1]+c)]}}this.change((a,l)=>Object.assign((l.walls??[]).find(c=>c.id===i.id),r),i.base,!1);break}case"vertex":{let s=this.snap(n,{roomId:i.roomId,index:i.index},e.altKey);i.moved=!0,this.change((r,a)=>{a.rooms.find(l=>l.id===i.roomId).points[i.index]=s},i.base,!1);break}case"room":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.base.floors.find(c=>c.id===this._floorId)?.rooms.find(c=>c.id===i.roomId);if(!s)return;let r=this.roomDelta(s,[n[0]-i.start[0],n[1]-i.start[1]],e.altKey),a=i.base.floors.find(c=>c.id===this._floorId),l=new Set(a.placements.filter(c=>D([c.x,c.z],s.points)).map(c=>c.entity_id));this.change((c,d)=>{let h=d.rooms.find(p=>p.id===i.roomId);h.points=s.points.map(([p,g])=>[M(p+r[0]),M(g+r[1])]),d.placements=a.placements.map(p=>l.has(p.entity_id)?{...p,x:M(p.x+r[0]),z:M(p.z+r[1])}:p)},i.base,!1);break}case"roofmove":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=e.altKey?.01:this._doc.settings.grid,r=M(Math.round((n[0]-i.start[0])/s)*s),a=M(Math.round((n[1]-i.start[1])/s)*s),l=i.base.settings.roof.sections?.find(c=>c.id===i.id);if(!l)return;this.change(c=>{let d=c.settings.roof.sections?.find(h=>h.id===i.id);d&&Object.assign(d,{x0:M(l.x0+r),x1:M(l.x1+r),z0:M(l.z0+a),z1:M(l.z1+a)})},i.base,!1);break}case"solarturn":{i.moved=!0;let s=i.base.settings.roof.solar?.find(p=>p.id===i.id),r=s?te(i.base,s):null;if(!s||!r)return;let[a,l]=ht(r,s),c=Math.atan2(n[0]-a,-(n[1]-l))*180/Math.PI,d=e.altKey?1:15;c=Math.round(c/d)*d;let h=dt(i.base,s,c);this.change(p=>{let g=p.settings.roof.solar?.find(f=>f.id===i.id);g&&Object.assign(g,h)},i.base,!1);break}case"solarmove":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.win?i.base.settings.roof.windows?.find(y=>y.id===i.id):void 0,r=i.win?s?Be(s):void 0:i.base.settings.roof.solar?.find(y=>y.id===i.id),a=i.win?q(i.base):[...q(i.base),...this._floorId?de(i.base,this._floorId):[]],l=r?te(i.base,r,a):null;if(!r||!l)return;let c=e.altKey?.01:.05,d=y=>M(Math.round(y/c)*c),h=l.unbounded?null:Cs(a,n),p=l,g,f;if(h&&i.grab)p=h.face,g=d(h.u-i.grab.du),f=Number.isNaN(h.s)?h.face.key===r.face?r.v:Math.max(0,h.face.ls-1.5):d(h.s-i.grab.ds);else{let y=n[0]-i.start[0],b=n[1]-i.start[1],m=[l.es[0],l.es[2]],_=m[0]*m[0]+m[1]*m[1]||1;g=d(r.u+y*l.eu[0]+b*l.eu[2]),f=d(r.v+(y*m[0]+b*m[1])/_)}let u=ct(p,{...r,face:p.key,u:g,v:f,tilt:p.flat?r.tilt??15:r.tilt});this.change(y=>{if(i.win){let m=y.settings.roof.windows?.find(_=>_.id===i.id);m&&Object.assign(m,{face:p.key,...u});return}let b=y.settings.roof.solar?.find(m=>m.id===i.id);b&&Object.assign(b,{face:p.key,...u},p.flat&&b.tilt==null?{tilt:15}:{})},i.base,!1);break}case"outvertex":{i.moved=!0;let s=this.snap(n,void 0,e.altKey),r=i.base.floors.find(l=>l.id===this._floorId)?.outdoor.find(l=>l.id===i.id);if(!r)return;let a=xt(r.points);this.change((l,c)=>{let d=c.outdoor.find(f=>f.id===i.id);if(!d)return;let h=r.points.map(f=>[...f]),p=i.index,g=r.points[p];h[p]=[M(s[0]),M(s[1])],a&&r.points.forEach((f,u)=>{u!==p&&(Math.abs(f[0]-g[0])<1e-6&&(h[u][0]=M(s[0])),Math.abs(f[1]-g[1])<1e-6&&(h[u][1]=M(s[1])))}),d.points=h},i.base,!1);break}case"cablept":{i.moved=!0;let s=this.snap(n,void 0,e.altKey);this.change(r=>{let a=r.settings.roof.cables?.find(l=>l.id===i.id);a&&a.points[i.index]&&(a.points[i.index]=[M(s[0]),M(s[1])])},i.base,!1);break}case"roofcorner":{i.moved=!0;let s=this.snap(n,void 0,e.altKey);this.change(r=>{let a=r.settings.roof.sections?.find(l=>l.id===i.id);a&&(i.corner[0]?a.x1=M(s[0]):a.x0=M(s[0]),i.corner[1]?a.z1=M(s[1]):a.z0=M(s[1]))},i.base,!1);break}case"opening":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.base.floors.find(c=>c.id===this._floorId),r=s?.openings.find(c=>c.id===i.id),a=r&&s?De(r,s.rooms,s.walls??[]):null;if(!r||!a)return;let l=this.offsetOnEdge(a.room,a.edge,n,r.width,e.altKey);this.change((c,d)=>Object.assign(d.openings.find(h=>h.id===i.id),{offset:l}),i.base,!1);break}case"furniture":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.base.floors.find(h=>h.id===this._floorId)?.furniture.find(h=>h.id===i.id);if(!s)return;let r=e.altKey?.01:this._doc.settings.grid,a=M(Math.round((s.x+n[0]-i.start[0])/r)*r),l=M(Math.round((s.z+n[1]-i.start[1])/r)*r),c=s.rotation,d=e.altKey?null:this.snapToWall({...s,x:a,z:l});d&&({x:a,z:l,rotation:c}=d),this.change((h,p)=>Object.assign(p.furniture.find(g=>g.id===i.id),{x:a,z:l,rotation:c}),i.base,!1);break}case"outdoor":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.base.floors.find(c=>c.id===this._floorId)?.outdoor.find(c=>c.id===i.id);if(!s)return;let r=e.altKey?.01:this._doc.settings.grid,a=Math.round((n[0]-i.start[0])/r)*r,l=Math.round((n[1]-i.start[1])/r)*r;this.change((c,d)=>d.outdoor.find(h=>h.id===i.id).points=s.points.map(([h,p])=>[M(h+a),M(p+l)]),i.base,!1);break}case"resize":{i.moved=!0;let s=i.base.floors.find(a=>a.id===this._floorId)?.furniture.find(a=>a.id===i.id);if(!s)return;let r=Xi(s,i.corner,n,e.altKey?.01:this._doc.settings.grid);this.change((a,l)=>Object.assign(l.furniture.find(c=>c.id===i.id),r),i.base,!1);break}case"rotate":{i.moved=!0;let s=i.base.floors.find(l=>l.id===this._floorId)?.furniture.find(l=>l.id===i.id);if(!s)return;let r=Math.atan2(-(n[0]-s.x),n[1]-s.z)*180/Math.PI,a=e.altKey?1:15;r=(Math.round(r/a)*a%360+360)%360,this.change((l,c)=>Object.assign(c.furniture.find(d=>d.id===i.id),{rotation:r}),i.base,!1);break}case"aim":{i.moved=!0;let s=i.base.floors.find(c=>c.id===this._floorId)?.placements.find(c=>c.entity_id===i.entityId);if(!s)return;let r=Math.atan2(-(n[0]-s.x),n[1]-s.z)*180/Math.PI,a=e.altKey?1:5;r=(Math.round(r/a)*a%360+360)%360;let l=Math.min(50,Math.max(.5,Math.round(Math.hypot(n[0]-s.x,n[1]-s.z)*10)/10));this.change((c,d)=>Object.assign(d.placements.find(h=>h.entity_id===i.entityId),{rotation:r,reach:l}),i.base,!1);break}case"device":{if(!i.moved&&Math.hypot(t[0]-i.startScreen[0],t[1]-i.startScreen[1])<5)return;i.moved=!0;let s=i.base.floors.find(c=>c.id===this._floorId)?.placements.find(c=>c.entity_id===i.entityId);if(!s)return;let r=e.altKey?.01:this._doc.settings.grid,a=M(Math.round((s.x+n[0]-i.start[0])/r)*r),l=M(Math.round((s.z+n[1]-i.start[1])/r)*r);this.change((c,d)=>Object.assign(d.placements.find(h=>h.entity_id===i.entityId),{x:a,z:l}),i.base,!1);break}}}onPointerUp(e){if(clearTimeout(this.pressTimer),this.pressStart=null,this.fixedPan=!1,this.pointers.delete(e.pointerId),this.pinch){this.pointers.size<2&&(this.pinch=null);return}let t=this.drag;if(this.drag=null,!t||e.type==="pointercancel"){t&&hr.has(t.kind)&&"moved"in t&&t.moved&&"base"in t&&this.restoreLive(t.base);return}let n=this.localPoint(e);switch(t.kind){case"freewall":{Math.hypot(t.end[0]-t.start[0],t.end[1]-t.start[1])>=.2&&this.addFreeWall(t.start,t.end),this._guides={};break}case"wallmove":t.moved&&this.pushHistory(t.base),this._guides={};break;case"rect":{let[i,s]=t.start,[r,a]=t.end;if(Math.abs(r-i)>=.2&&Math.abs(a-s)>=.2){let l=[Math.min(i,r),Math.min(s,a)],c=[Math.max(i,r),Math.max(s,a)],d=[l,[c[0],l[1]],c,[l[0],c[1]]];t.outdoor?this.addOutdoor(d):t.hole?this.addHole(l,c):t.roof?this.addRoofSection(l,c):this.addRoom(d)}this._guides={};break}case"tap":if(t.panning)break;this._tool==="measure"?this._draft=[this.snap(this.toWorld(...n),void 0,e.altKey)]:this.addDraftPoint(this.snap(this.toWorld(...n),void 0,e.altKey),n);break;case"opening":case"furniture":case"rotate":case"aim":case"resize":case"outdoor":case"solarmove":case"solarturn":case"roofmove":case"roofcorner":case"cablept":t.moved&&this.pushHistory(t.base);break;case"device":t.moved?this.pushHistory(t.base):this.selectItem("device",t.entityId);break;case"vertex":case"room":t.moved&&this.pushHistory(t.base),this._guides={};break;default:break}}onWheel(e){e.preventDefault();let[t,n]=this.localPoint(e);this.zoomAt(Math.exp(-e.deltaY*(e.deltaMode===1?.05:.0015)),t,n)}pinchState(){let e=[...this.pointers.values()];if(e.length<2)return null;let[t,n]=e;return{dist:Math.hypot(t[0]-n[0],t[1]-n[1]),mid:[(t[0]+n[0])/2,(t[1]+n[1])/2]}}pushHistory(e){this.past.push(JSON.stringify(e)),this.past.length>ur&&this.past.shift(),this.future=[],this._canUndo=!0,this._canRedo=!1}restoreLive(e){this._doc=e,this.dispatchEvent(new CustomEvent("building-changed",{detail:{building:e},bubbles:!0,composed:!0}))}roomDelta(e,t,n){if(n)return t;let i=this._doc.settings.grid,s=[Math.round(t[0]/i)*i,Math.round(t[1]/i)*i],a=Vt/this._view.scale;this._guides={};for(let l of this.floor?.rooms??[])if(l.id!==e.id)for(let c of l.points)for(let d of e.points){let h=Math.hypot(d[0]+t[0]-c[0],d[1]+t[1]-c[1]);h<a&&(a=h,s=[c[0]-d[0],c[1]-d[1]],this._guides={point:c})}return s}roomAt(e){return(this.floor?.rooms??[]).filter(i=>D(e,i.points)).sort((i,s)=>Te(i.points)-Te(s.points))[0]?.id??null}addDraftPoint(e,t){let n=this._draft;if(n.length>=3){let[s,r]=this.toScreen(n[0]);if(Math.hypot(s-t[0],r-t[1])<14){this.closeDraft();return}}let i=n[n.length-1];i&&Math.hypot(i[0]-e[0],i[1]-e[1])<1e-6||(this._draft=[...n,e])}closeDraft(){this._draft.length>=3&&Te(this._draft)>.05&&this.addRoom(this._draft),this._draft=[],this._cursor=null,this._guides={}}measureStep(e){let t=this._draft[this._draft.length-1];if(!t||!(this._measureLen>0))return;let n=Pe(t,this._measureLen,e),i=this._draft[0];if(this._draft.length>=3&&Math.hypot(n[0]-i[0],n[1]-i[1])<.01){this.closeDraft();return}this._draft=[...this._draft,n]}rectBySize(){let e=this._draft[0]??[0,0],[t,n]=this._rectSize;t>.1&&n>.1&&(this.addRoom([e,Pe(e,t,"right"),Pe(Pe(e,t,"right"),n,"down"),Pe(e,n,"down")]),this._draft=[])}renderMeasureForm(){let e=this._draft,t=e[0],n=e[e.length-1],i=t&&n&&e.length>1?Math.hypot(n[0]-t[0],n[1]-t[1]):0,s=[["up","\u2191"],["left","\u2190"],["right","\u2192"],["down","\u2193"]],r=a=>C(this.hass,a,2);return v`<section>
      <h3>${this.t("measure")}</h3>
      ${t?v`<p class="fp3d-sub">${this.t("measure_from",{x:r(t[0]),z:r(t[1])})}</p>
            <div class="fp3d-form">
              <label class="fp3d-field fp3d-wide"
                >${this.t("measure_length")}
                <input
                  class="fp3d-measure-input"
                  type="number"
                  inputmode="decimal"
                  step="0.01"
                  min="0.05"
                  .value=${String(this._measureLen)}
                  @input=${a=>this._measureLen=parseFloat(a.target.value.replace(",","."))||0}
                  @keydown=${a=>{let l={ArrowRight:"right",ArrowLeft:"left",ArrowUp:"up",ArrowDown:"down"}[a.key];l?(a.preventDefault(),this.measureStep(l)):a.key==="Enter"&&this.closeDraft()}}
              /></label>
              <div class="fp3d-arrows fp3d-wide">
                ${s.map(([a,l])=>v`<button class="fp3d-btn fp3d-arrow-${a}" title=${this.t(`dir_${a}`)} @click=${()=>this.measureStep(a)}>${l}</button>`)}
              </div>
            </div>
            ${e.length>1?v`<ol class="fp3d-measure-list">
                  ${e.slice(1).map((a,l)=>v`<li>${r(Math.hypot(a[0]-e[l][0],a[1]-e[l][1]))} m</li>`)}
                </ol>`:w}
            <div class="fp3d-actions">
              <button class="fp3d-btn fp3d-primary" ?disabled=${e.length<3} @click=${()=>this.closeDraft()}>${this.t("measure_close")}</button>
              <button class="fp3d-btn" ?disabled=${e.length<2} @click=${()=>this._draft=e.slice(0,-1)}>${this.t("measure_undo")}</button>
            </div>
            ${e.length>=3?v`<p class="fp3d-sub">${this.t("measure_gap",{gap:r(i)})}</p>`:w}`:v`<p class="fp3d-sub">${this.t("measure_start")}</p>`}
      <h4 class="fp3d-lib-head">${this.t("rect_by_size")}</h4>
      <div class="fp3d-form">
        ${this.num(this.t("width"),this._rectSize[0],a=>this._rectSize=[Math.max(.1,a),this._rectSize[1]],.01,.1)}
        ${this.num(this.t("depth"),this._rectSize[1],a=>this._rectSize=[this._rectSize[0],Math.max(.1,a)],.01,.1)}
        <button class="fp3d-btn fp3d-wide" @click=${()=>this.rectBySize()}>${this.t("rect_add")}</button>
      </div>
      <p class="fp3d-sub">${this.t("measure_hint")}</p>
    </section>`}addFreeWall(e,t){if(!this.floor)return;let n={id:H("wall"),a:[M(e[0]),M(e[1])],b:[M(t[0]),M(t[1])],thickness:null};this.change((i,s)=>s.walls=[...s.walls??[],n]),this.selectItem("wall",n.id)}get freeWall(){return this._wallId?(this.floor?.walls??[]).find(e=>e.id===this._wallId):void 0}updateFreeWall(e){let t=this._wallId;t&&this.change((n,i)=>Object.assign((i.walls??[]).find(s=>s.id===t),e))}deleteFreeWall(){let e=this._wallId;!e||!this.isAdmin||!this.confirmFixedDelete("wall",e)||(this.change((t,n)=>{n.walls=(n.walls??[]).filter(i=>i.id!==e),n.openings=n.openings.filter(i=>i.wall!==e)}),this._wallId=null)}renderFreeWalls(e){return F`<g>${(e.walls??[]).map(t=>{let[n,i]=this.toScreen(t.a),[s,r]=this.toScreen(t.b),a=t.id===this._wallId;return F`<g data-free-wall=${t.id} class=${`fp3d-free-wall${a?" fp3d-free-wall-sel":""}`}>
        <line class="fp3d-hit" x1=${n} y1=${i} x2=${s} y2=${r} />
        <line class="fp3d-free-wall-line" x1=${n} y1=${i} x2=${s} y2=${r} />
      </g>
      ${a&&this.isAdmin&&!cn(t,!0,this._doc.settings)?F`<g class="fp3d-vertex" data-wall-end=${`${t.id}:a`}><circle cx=${n} cy=${i} r="16" class="fp3d-hit" /><circle cx=${n} cy=${i} r="6" /></g>
            <g class="fp3d-vertex" data-wall-end=${`${t.id}:b`}><circle cx=${s} cy=${r} r="16" class="fp3d-hit" /><circle cx=${s} cy=${r} r="6" /></g>`:w}`})}</g>`}renderFreeWallForm(e){let t=this.isAdmin,n=Math.hypot(e.b[0]-e.a[0],e.b[1]-e.a[1]),i=s=>{let a=Math.max(.1,s)/(n||1);this.updateFreeWall({b:[M(e.a[0]+(e.b[0]-e.a[0])*a),M(e.a[1]+(e.b[1]-e.a[1])*a)]})};return v`<section>
      <div class="fp3d-h3row"><h3>${this.t("free_wall")}</h3>${this.fixButton("wall",e.id)}</div>
      <div class="fp3d-form">
        ${this.num(this.t("wall_length"),n,i,.01,.1)}
        ${this.num(this.t("wall_thickness"),e.thickness??this._doc.settings.wall_interior,s=>this.updateFreeWall({thickness:Math.min(1,Math.max(.02,s))}),.01,.02)}
        ${this.num(this.t("wall_height"),e.height??this.floor?.height??2.5,s=>this.updateFreeWall({height:s>=(this.floor?.height??2.5)-.005?null:Math.max(.05,s)}),.05,.05)}
      </div>
      ${t?v`<div class="fp3d-actions">
            <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteFreeWall()}>${this.t("delete")}</button>
          </div>`:w}
      <p class="fp3d-sub">${this.t("free_wall_hint")}</p>
    </section>`}addHole(e,t){if(!this.floor)return;let n={id:H("hole"),type:"stairwell",x:M((e[0]+t[0])/2),z:M((e[1]+t[1])/2),w:M(t[0]-e[0]),d:M(t[1]-e[1]),h:.02,rotation:0,variant:null};this.change((i,s)=>s.furniture.push(n)),this.selectItem("furniture",n.id),this._tool="select"}addOutdoor(e){if(!this.floor)return;let t={id:H("outdoor"),type:"lawn",points:e.map(([n,i])=>[M(n),M(i)])};this.change((n,i)=>i.outdoor.push(t)),this.selectItem("outdoor",t.id),this._tool="select"}get outdoorArea(){return this._outdoorId?this.floor?.outdoor.find(e=>e.id===this._outdoorId):void 0}updateOutdoor(e){let t=this._outdoorId;this.change((n,i)=>Object.assign(i.outdoor.find(s=>s.id===t),e))}deleteOutdoor(){let e=this._outdoorId;!e||!this.isAdmin||!this.confirmFixedDelete("outdoor",e)||(this.change((t,n)=>n.outdoor=n.outdoor.filter(i=>i.id!==e)),this._outdoorId=null)}duplicateOutdoor(){let e=this.outdoorArea;if(!e||!this.isAdmin)return;let t={...e,id:H("outdoor"),points:e.points.map(([n,i])=>[M(n+.5),M(i+.5)])};this.change((n,i)=>i.outdoor.push(t)),this.selectItem("outdoor",t.id)}addRoom(e){if(!this.floor)return;let t=H("room"),n=this.floor.rooms.length+1;this.change((i,s)=>s.rooms.push({id:t,name:this.t("new_room",{n}),area_id:null,points:e.map(([r,a])=>[M(r),M(a)]),floor_material:"wood"})),this._roomId=t,this._vertex=null,this._tool="select"}onKey=e=>{if(e.composedPath().some(i=>i instanceof HTMLInputElement||i instanceof HTMLSelectElement||i instanceof HTMLTextAreaElement)||!this.isConnected||!this.offsetParent)return;let n=e.ctrlKey||e.metaKey;if(n&&e.key.toLowerCase()==="z")e.preventDefault(),e.shiftKey?this.redo():this.undo();else if(n&&e.key.toLowerCase()==="y")e.preventDefault(),this.redo();else if(n&&e.key.toLowerCase()==="d")e.preventDefault(),this.duplicateRoom();else if(e.key==="Delete"||e.key==="Backspace"&&(this._tool==="select"||this._tool==="furniture"))this._deviceId?this.deleteItem("device",this._deviceId):this._outdoorId?this.deleteOutdoor():this._wallId?this.deleteFreeWall():this._openingId?this.deleteOpening():this._furnitureId?this.deleteFurniture():this._vertex!==null?this.deleteVertex(this._vertex):this.deleteRoom();else if(e.key.toLowerCase()==="l"&&!n&&this._tool==="roof"&&this.roofSection&&!this._doc.settings.lock_plan)this.updateRoofSection({locked:!this.roofSection.locked});else if(e.key.toLowerCase()==="l"&&!n&&(this._furnitureId||this._deviceId)){let i=this.selectedFix;this.toggleFixed(i.kind,i.id)}else if(Object.hasOwn(pr,e.key)&&!n&&(this._tool==="select"||this._tool==="furniture")){let i=e.altKey?.01:e.shiftKey?.1:this._doc.settings.grid,[s,r]=pr[e.key];this.nudge(s*i,r*i)&&e.preventDefault()}else if(e.key.toLowerCase()==="r"&&!n&&this._furnitureId)this.rotateFurniture(e.shiftKey?-90:90);else if(e.key==="Backspace"&&this._tool==="polygon")this._draft=this._draft.slice(0,-1);else if(e.key==="Enter"&&this._tool==="polygon")this.closeDraft();else if(e.key==="Escape"){if(this._ctx){this._ctx=null;return}this._draft.length?this._draft=[]:this._tool!=="select"?this._tool="select":this.selectItem("room",null),this._cursor=null}};nudge(e,t){let n=this.floor;if(!n||!this.isAdmin)return!1;let i=this.selectedFix;if(i&&this.isFixedItem(i.kind,i.id))return this._fixedHint=!0,!0;let s=r=>[M(r[0]+e),M(r[1]+t)];if(this._deviceId){let r=this._deviceId;if(!n.placements.some(a=>a.entity_id===r))return!1;this.change((a,l)=>{let c=l.placements.find(d=>d.entity_id===r);[c.x,c.z]=s([c.x,c.z])})}else if(this._furnitureId){let r=this._furnitureId;this.change((a,l)=>{let c=l.furniture.find(d=>d.id===r);c&&([c.x,c.z]=s([c.x,c.z]))})}else if(this._openingId){let r=this.opening,a=r?De(r,n.rooms,n.walls??[]):null;if(!r||!a)return!1;let l=a.room.points[a.edge],c=a.room.points[(a.edge+1)%a.room.points.length],d=Math.hypot(c[0]-l[0],c[1]-l[1])||1,h=(e*(c[0]-l[0])+t*(c[1]-l[1]))/d;if(Math.abs(h)<1e-9)return!0;let p=Math.min(r.width,d)/2;this.updateOpening({offset:M(Math.min(d-p,Math.max(p,r.offset+h)))})}else if(this._wallId){let r=this._wallId;this.change((a,l)=>{let c=(l.walls??[]).find(d=>d.id===r);c&&([c.a,c.b]=[s(c.a),s(c.b)])})}else if(this._outdoorId){let r=this._outdoorId;this.change((a,l)=>{let c=l.outdoor.find(d=>d.id===r);c&&(c.points=c.points.map(s))})}else if(this._roomId){let r=this._roomId,a=this._vertex,l=n.rooms.find(d=>d.id===r);if(!l)return!1;let c=new Set(n.placements.filter(d=>D([d.x,d.z],l.points)).map(d=>d.entity_id));this.change((d,h)=>{let p=h.rooms.find(g=>g.id===r);if(a!==null&&a<p.points.length){p.points[a]=s(p.points[a]);return}p.points=p.points.map(s);for(let g of h.placements)c.has(g.entity_id)&&([g.x,g.z]=s([g.x,g.z]))})}else return!1;return!0}get freeHaFloors(){let e=new Set(this._doc.floors.map(t=>t.ha_floor));return Object.values(this.hass?.floors??{}).filter(t=>!e.has(t.floor_id)).sort((t,n)=>(t.level??99)-(n.level??99)||t.name.localeCompare(n.name))}unplacedAreas(e){if(!e.ha_floor)return[];let t=new Set(this._doc.floors.flatMap(n=>n.rooms.map(i=>i.area_id)));return Object.values(this.hass?.areas??{}).filter(n=>n.floor_id===e.ha_floor&&!t.has(n.area_id)).sort((n,i)=>n.name.localeCompare(i.name))}addFloor(e=null){let t=this._doc.floors,n=H("floor"),i=e?.name??(t.length===0?this.t("default_floor"):this.t("new_floor",{n:t.length})),s={...ji(n,i,Ui(t,e?.level)),ha_floor:e?.floor_id??null},r=structuredClone(this._doc),a=r.floors.findIndex(l=>l.elevation>s.elevation);r.floors.splice(a<0?r.floors.length:a,0,s),this.setDoc(r),this._floorId=n,this._roomId=null,this._floorMenu=!1,this.fit()}addAreaRooms(e){let t=this.unplacedAreas(e);if(!t.length)return;let n=qi(e,t,()=>H("room"));this.change((i,s)=>s.rooms.push(...n)),this.fit()}moveFloor(e){let t=this._doc.floors.findIndex(s=>s.id===this._floorId),n=t+e;if(t<0||n<0||n>=this._doc.floors.length)return;let i=structuredClone(this._doc);[i.floors[t],i.floors[n]]=[i.floors[n],i.floors[t]],this.setDoc(i)}deleteFloor(){let e=this.floor;if(!e||!confirm(this.t("delete_floor_confirm",{name:e.name})))return;let t=structuredClone(this._doc);t.floors=t.floors.filter(n=>n.id!==e.id),this.setDoc(t),this._floorId=t.floors[0]?.id??null,this._roomId=null}deleteRoom(){let e=this._roomId;!e||!this.isAdmin||!this.confirmFixedDelete("room",e)||(this.change((t,n)=>{let i=n.rooms.find(s=>s.id===e);n.rooms=n.rooms.filter(s=>s.id!==e),n.openings=n.openings.filter(s=>s.room_id!==e||s.wall),i&&(n.placements=n.placements.filter(s=>!D([s.x,s.z],i.points)))}),this._roomId=null,this._vertex=null)}duplicateRoom(){let e=this.room;if(!e||!this.isAdmin)return;let t=H("room");this.change((n,i)=>i.rooms.push({...structuredClone(e),id:t,points:e.points.map(([s,r])=>[M(s+.5),M(r+.5)])})),this._roomId=t}roofFixed(e){return!!e&&(!!e.locked||!!this._doc.settings.lock_plan)}renderRoofFloors(){let e=[...this._doc.floors].sort((t,n)=>n.elevation-t.elevation);return e.length<2?w:v`<div class="fp3d-seg fp3d-dev-source">
      ${e.map(t=>v`<button aria-pressed=${t.id===this._floorId} @click=${()=>this._floorId=t.id}>${t.name}</button>`)}
    </div>`}get roofSection(){return this._roofId?this._doc.settings.roof.sections?.find(e=>e.id===this._roofId):void 0}useRoofSections(e=!1){if(!this.isAdmin)return;let t=(this._doc.settings.roof.sections??[]).length>0;e&&t&&!confirm(this.t("roof_regen_confirm"))||(this.change(n=>{n.settings.roof.type="custom",(e||!t)&&(n.settings.roof.sections=Os(n,()=>H("roof")))}),this._roofId=null)}addRoofSection(e,t){if(!this.isAdmin)return;let n=Ts(this._doc,e[0],e[1],t[0],t[1]),i=Math.min(...this._doc.floors.map(c=>c.elevation)),s=n===null,r=M(n??i+2.4),a=s?6:this._doc.settings.roof.pitch||35,l={id:H("roof"),x0:M(e[0]),z0:M(e[1]),x1:M(t[0]),z1:M(t[1]),shape:s?"pent":"gable",axis:t[0]-e[0]>=t[1]-e[1]?"x":"z",eave_a:r,eave_b:r,pitch_a:a,pitch_b:a,base:r,overhang:s?.15:null,...s?{open:!0}:{}};this.change(c=>{c.settings.roof.type="custom",c.settings.roof.sections=[...c.settings.roof.sections??[],l]}),this._roofId=l.id}updateRoofSection(e){let t=this._roofId;!t||!this.isAdmin||this.change(n=>{let i=n.settings.roof.sections?.find(s=>s.id===t);i&&Object.assign(i,e)})}deleteRoofSection(){let e=this._roofId;!e||!this.isAdmin||(this.change(t=>t.settings.roof.sections=(t.settings.roof.sections??[]).filter(n=>n.id!==e)),this._roofId=null)}duplicateRoofSection(){let e=this.roofSection;if(!e||!this.isAdmin)return;let t={...structuredClone(e),id:H("roof"),x0:M(e.x0+1),x1:M(e.x1+1),z0:M(e.z0+1),z1:M(e.z1+1)};this.change(n=>n.settings.roof.sections=[...n.settings.roof.sections??[],t]),this._roofId=t.id}renderRoofSections(){let e=this._doc.settings.roof,t=e.type==="custom"?e.sections??[]:[];return F`<g class="fp3d-roof-layer">${t.map((n,i)=>{let s=n.id===this._roofId,r=We(n),a=at(n),l=[r.at(r.u0,0),r.at(r.u1,0),r.at(r.u1,r.w),r.at(r.u0,r.w)].map(f=>this.toScreen(f)),c=(f,u)=>{let[y,b]=this.toScreen(f),[m,_]=this.toScreen(u);return F`<line x1=${y} y1=${b} x2=${m} y2=${_} />`},d;if(n.shape==="hip"){let f=Math.min((r.u1-r.u0)/2,Math.min(a.vr,r.w-a.vr)||r.w/2),u=r.at(r.u0+f,a.vr),y=r.at(r.u1-f,a.vr);d=F`${c(u,y)}${c(r.at(r.u0,0),u)}${c(r.at(r.u0,r.w),u)}${c(r.at(r.u1,0),y)}${c(r.at(r.u1,r.w),y)}`}else n.shape==="gable"?d=c(r.at(r.u0,a.vr),r.at(r.u1,a.vr)):n.shape==="pent"&&(d=c(r.at(r.u0,r.w),r.at(r.u1,r.w)));let[h,p]=this.toScreen(r.at((r.u0+r.u1)/2,r.w/2)),g=`${this.roofFixed(n)?"\u{1F512} ":""}${i+1} \xB7 ${n.open?this.t("roof_open_short"):this.t(`roof_shape_${n.shape}`)} \xB7 ${C(this.hass,At(n),1)} m`;return F`<g data-roof=${n.id} class=${`fp3d-roof-sec${s?" fp3d-roof-sel":""}`}>
          <polygon points=${l.map(f=>f.join(",")).join(" ")} />
          <g class="fp3d-roof-ridge">${d}</g>
          <text x=${h} y=${p-14}>${g}</text>
        </g>
        ${s&&this.isAdmin&&!this.roofFixed(n)?[[0,0],[1,0],[1,1],[0,1]].map(([f,u])=>{let[y,b]=this.toScreen([f?Math.max(n.x0,n.x1):Math.min(n.x0,n.x1),u?Math.max(n.z0,n.z1):Math.min(n.z0,n.z1)]);return F`<g class="fp3d-vertex" data-roof-corner=${`${n.id}:${f}:${u}`}><circle cx=${y} cy=${b} r="16" class="fp3d-hit" /><circle cx=${y} cy=${b} r="6" /></g>`}):w}`})}</g>`}faceHit(e,t){return e.wall?{u:(t[0]-e.o[0])*e.eu[0]+(t[1]-e.o[2])*e.eu[2],s:Number.NaN}:Ot(e,t)}renderSolarFields(){let e=this._doc.settings.roof.solar??[];if(!e.length)return w;let t=q(this._doc);return F`<g class="fp3d-solar-layer">${e.map(n=>{let i=te(this._doc,n,t);if(!i||i.wall&&i.wall.floorId!==this._floorId)return w;let s=n.id===this._solarId,r=w;if(s&&i.unbounded&&this.isAdmin&&!n.locked){let[a,l]=ht(i,n),c=(n.rotation??0)*Math.PI/180,d=.9+Math.max(...me(i,n,!0).flatMap(u=>u.corners.map(y=>Math.hypot(y[0]-a,y[2]-l))))*.5,[h,p]=this.toScreen([a,l]),[g,f]=this.toScreen([a+Math.sin(c)*d,l-Math.cos(c)*d]);r=F`<g class="fp3d-rotate" data-solar-turn=${n.id}>
          <line x1=${h} y1=${p} x2=${g} y2=${f} />
          <circle cx=${g} cy=${f} r="16" class="fp3d-hit" />
          <circle cx=${g} cy=${f} r="8" />
          <path d="M${g-4} ${f-1}a4 4 0 1 1 2 3.5" />
        </g>`}return F`<g data-solar=${n.id} class=${`fp3d-solar${s?" fp3d-solar-sel":""}${s&&this._solarPick?" fp3d-solar-pick":""}`}>${me(i,n,s).map(a=>{let l=i.wall?Math.max(.3,...a.corners.map(d=>(d[0]-i.o[0])*i.n[0]+(d[2]-i.o[2])*i.n[2])):0,c=i.wall?[a.corners[0],a.corners[1]].flatMap((d,h)=>{let p=[d[0],d[2]],g=[d[0]+i.n[0]*l,d[2]+i.n[2]*l];return h===0?[p,g]:[g,p]}):a.corners.map(d=>[d[0],d[2]]);return F`<polygon data-cell=${a.cell} class=${a.skipped?"fp3d-solar-off":""} points=${c.map(d=>this.toScreen(d).join(",")).join(" ")} />`})}</g>${r}`})}</g>`}renderRoofWindows(){let e=this._doc.settings.roof.windows??[];if(!e.length)return w;let t=new Map(q(this._doc).map(n=>[n.key,n]));return F`<g class="fp3d-roofwin-layer">${e.map(n=>{let i=t.get(n.face),s=i?Gs(i,n):null;return s?F`<g data-roofwin=${n.id} class=${`fp3d-roofwin${n.id===this._roofWinId?" fp3d-roofwin-sel":""}`}><polygon points=${s.map(r=>this.toScreen([r[0],r[2]]).join(",")).join(" ")} /></g>`:w})}</g>`}addRoofWindow(){if(!this.isAdmin)return;let e=q(this._doc).filter(i=>!i.flat),t=Dt(e,this._doc.settings.north??0)??q(this._doc)[0];if(!t)return;let n=Bn(t,H("rwin"));this.change(i=>i.settings.roof.windows=[...i.settings.roof.windows??[],n]),this._roofWinId=n.id,this._roofId=null}updateRoofWindow(e){let t=this._roofWinId;!t||!this.isAdmin||this.change(n=>{let i=n.settings.roof.windows?.find(r=>r.id===t);if(!i)return;Object.assign(i,e);let s=q(n).find(r=>r.key===i.face);s&&Object.assign(i,ct(s,Be(i)))})}deleteRoofWindow(){let e=this._roofWinId;!e||!this.isAdmin||(this.change(t=>t.settings.roof.windows=(t.settings.roof.windows??[]).filter(n=>n.id!==e)),this._roofWinId=null)}renderRoofWindowList(){let e=this._doc.settings.roof.windows??[],t=new Map(q(this._doc).map(n=>[n.key,n]));return v`<section>
      <h3>🪟 ${this.t("roof_windows")}</h3>
      <p class="fp3d-sub">${this.t(t.size?"roof_windows_hint":"solar_no_roof")}</p>
      ${e.length?v`<div class="fp3d-room-list">
            ${e.map((n,i)=>{let s=t.get(n.face);return v`<div class="fp3d-row">
                <button class="fp3d-dev-name" @click=${()=>{this._roofWinId=n.id,this._roofId=null}}>
                  <span>${this.t("roof_window")} ${i+1} · ${s?this.faceLabel(s):this.t("solar_face_gone")}</span>
                </button>
              </div>`})}
          </div>`:w}
      <div class="fp3d-actions"><button class="fp3d-btn" ?disabled=${!this.isAdmin||!t.size} @click=${()=>this.addRoofWindow()}>+ ${this.t("roof_window")}</button></div>
    </section>`}renderRoofWindowForm(e){let t=this.isAdmin,n=q(this._doc),i=l=>this.updateRoofWindow(l),s=(this._doc.settings.roof.windows??[]).findIndex(l=>l.id===e.id)+1,r=this.entityOptions(l=>l.startsWith("cover.")),a=this.entityOptions(l=>l.startsWith("binary_sensor.")||l.startsWith("sensor."));return v`<button class="fp3d-btn fp3d-back" @click=${()=>this._roofWinId=null}>‹ ${this.t("roof_sections")}</button>
      <section>
        <div class="fp3d-h3row">
          <h3>🪟 ${this.t("roof_window")} ${s}</h3>
          ${t?v`<button class="fp3d-btn fp3d-fix" aria-pressed=${!!e.locked} title=${this.t("fix_hint")} @click=${()=>i({locked:!e.locked})}>
                ${e.locked?`\u{1F512} ${this.t("unfix")}`:`\u{1F513} ${this.t("fix")}`}
              </button>`:w}
        </div>
        <div class="fp3d-form">
          <label class="fp3d-field fp3d-wide"
            >${this.t("solar_face")}
            <select ?disabled=${!t} @change=${l=>{let c=n.find(d=>d.key===l.target.value);c&&i({...Bn(c,e.id),w:e.w,h:e.h,cover:e.cover,contact:e.contact,tilt:e.tilt})}}>
              ${n.map(l=>v`<option value=${l.key} ?selected=${l.key===e.face}>${this.faceLabel(l)}</option>`)}
            </select></label
          >
          ${this.num(this.t("width"),e.w??.78,l=>i({w:Math.max(.3,Math.min(4,M(l)))}),.01,.3)}
          ${this.num(this.t("height_m"),e.h??1.18,l=>i({h:Math.max(.3,Math.min(4,M(l)))}),.01,.3)}
          ${this.num(this.t("solar_u"),e.u,l=>i({u:M(l)}),.05)}
          ${this.num(this.t("solar_v"),e.v,l=>i({v:M(l)}),.05)}
          ${this.entitySelect(this.t("cover_entity"),e.cover??null,void 0,r,l=>i({cover:l==="none"?null:l}))}
          ${this.entitySelect(this.t("contact_entity"),e.contact??null,void 0,a,l=>i({contact:l==="none"?null:l}))}
          ${this.entitySelect(this.t("roof_window_tilt"),e.tilt??null,void 0,a,l=>i({tilt:l==="none"?null:l}))}
        </div>
        <p class="fp3d-sub">${this.t("roof_window_hint")}</p>
        ${t?v`<div class="fp3d-actions"><button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteRoofWindow()}>${this.t("delete")}</button></div>`:w}
      </section>`}cableSegments(){if(this.cableCache?.doc===this._doc)return this.cableCache.segs;let e=this._doc,t=new Map((e.settings.roof.solar??[]).map(s=>[s.id,0])),n={grid:0,solar:0,battery:0,soc:null,tariff:null,consumption:0},i=[];try{i=nr({building:e,consumers:[],summary:n,fieldPower:t}).filter(s=>s.key)}catch{i=[]}return this.cableCache={doc:e,segs:i},i}cableKeys(){let e=[...new Set(this.cableSegments().map(n=>n.key))],t=n=>n.startsWith("solar:")?0:n.startsWith("inv:")?1:n.startsWith("bat:")?2:3;return e.sort((n,i)=>t(n)-t(i)||n.localeCompare(i))}cableLabel(e){let t=a=>{let l=this._doc.floors.flatMap(c=>c.furniture).find(c=>c.id===a);return l?l.name||this.t(`furn_${l.type}`):"?"},n=this._doc.floors.flatMap(a=>a.furniture).find(a=>a.type==="meter"),i=n?n.name||this.t("furn_meter"):this.t("energy_meter");if(e==="grid")return`${i} \u2192 ${this.t("furn_grid_point")}`;let[s,r]=[e.slice(0,e.indexOf(":")),e.slice(e.indexOf(":")+1)];if(s==="solar"){let a=this._doc.settings.roof.solar??[],l=a.findIndex(d=>d.id===r);return`${a[l]?.name||`${this.t("solar_field")} ${l+1}`} \u2192 ${this.t("furn_inverter")}`}return s==="inv"?`${t(r)} \u2192 ${i}`:`${this.t("furn_inverter")} \u2194 ${t(r)}`}layCable(e){if(!this.isAdmin||!this._floorId)return;let t=[];for(let s of this.cableSegments().filter(r=>r.key===e))for(let r of[s.a,s.b]){let a=[M(r[0]),M(r[2])],l=t[t.length-1];(!l||Math.hypot(l[0]-a[0],l[1]-a[1])>.05)&&t.push(a)}let n=t.length>2?t.slice(1,-1):t,i=this._floorId;this.change(s=>{s.settings.roof.cables=[...(s.settings.roof.cables??[]).filter(r=>r.id!==e),{id:e,floor_id:i,points:n.length?n:[t[0]??[0,0]],height:.03}]}),this._cableId=e}renderCables(){if(!st("energy_pro"))return w;let e=this.cableSegments();if(!e.length)return w;let t=e.filter(r=>r.floorId===this._floorId),n=this._doc.settings.roof.cables??[],i=this._cableId,s=[...new Set(e.map(r=>r.key))];return F`<g class="fp3d-cable-layer">${s.map(r=>{let a=n.find(y=>y.id===r),l=`fp3d-cable fp3d-cable-${r.split(":")[0]}${a?" fp3d-cable-laid":""}${r===i?" fp3d-cable-sel":""}`,c=e.filter(y=>y.key===r),d=t.filter(y=>y.key===r).map(y=>{let b=this.toScreen([y.a[0],y.a[2]]),m=this.toScreen([y.b[0],y.b[2]]);return F`<line x1=${b[0]} y1=${b[1]} x2=${m[0]} y2=${m[1]} />`});if(!(a&&r===i&&a.floor_id===this._floorId&&!a.locked))return d.length?F`<g class=${l} data-cable=${r}><g class="fp3d-cable-hit">${d}</g>${d}</g>`:w;let h=c[0],p=c[c.length-1],g=[this.toScreen([h.a[0],h.a[2]]),...a.points.map(y=>this.toScreen(y)),this.toScreen([p.b[0],p.b[2]])],f=g.slice(0,-1).map((y,b)=>F`<line class="fp3d-cable-piece" data-cable-line=${r} data-cable-seg=${b} x1=${y[0]} y1=${y[1]} x2=${g[b+1][0]} y2=${g[b+1][1]} />`),u=a.points.map((y,b)=>{let m=this.toScreen(y);return F`<g class="fp3d-vertex" data-cable-pt=${`${r}:${b}`}><circle cx=${m[0]} cy=${m[1]} r="16" class="fp3d-hit" /><circle cx=${m[0]} cy=${m[1]} r="6" /></g>`});return F`<g class=${l} data-cable=${r}>${d}${f}${u}</g>`})}</g>`}renderCableSettings(){let e=this.cableKeys();if(!e.length)return w;let t=this.isAdmin,n=this._doc.settings.roof.cables??[],i=this._cableId?n.find(s=>s.id===this._cableId):void 0;return v`<section>
      <h3>〰 ${this.t("cables_title")}</h3>
      <p class="fp3d-sub">${this.t("cables_hint")}</p>
      <div class="fp3d-room-list">
        ${e.map(s=>v`<div class="fp3d-row">
            <button
              class="fp3d-dev-name ${s===this._cableId?"fp3d-sel":""}"
              @click=${()=>{this._cableId=s===this._cableId?null:s;let r=n.find(a=>a.id===s);this._cableId&&r&&this._doc.floors.some(a=>a.id===r.floor_id)&&(this._floorId=r.floor_id)}}
            >
              <span>${this.cableLabel(s)}${n.some(r=>r.id===s)?v` <em class="fp3d-sub">· ${this.t("cable_laid")}</em>`:w}</span>
            </button>
          </div>`)}
      </div>
      ${this._cableId?v`<div class="fp3d-actions">
              ${i?v`<button class="fp3d-btn fp3d-fix" aria-pressed=${!!i.locked} title=${this.t("fix_hint")} ?disabled=${!t} @click=${()=>this.change(s=>{let r=s.settings.roof.cables?.find(a=>a.id===i.id);r&&(r.locked=!r.locked)})}>
                      ${i.locked?`\u{1F512} ${this.t("unfix")}`:`\u{1F513} ${this.t("fix")}`}
                    </button>
                    <button class="fp3d-btn" ?disabled=${!t} @click=${()=>this.change(s=>s.settings.roof.cables=(s.settings.roof.cables??[]).filter(r=>r.id!==this._cableId))}>${this.t("cable_auto")}</button>`:v`<button class="fp3d-btn fp3d-primary" ?disabled=${!t||!this._floorId} @click=${()=>this.layCable(this._cableId)}>${this.t("cable_lay")}</button>`}
            </div>
            ${i?v`<div class="fp3d-form">
                    ${this.num(this.t("cable_height"),i.height,s=>this.change(r=>{let a=r.settings.roof.cables?.find(l=>l.id===i.id);a&&(a.height=Math.min(30,Math.max(0,M(s))))}),.05,0)}
                  </div>
                  <p class="fp3d-sub">${i.floor_id===this._floorId?this.t("cable_points_hint"):this.t("cable_other_floor",{floor:this._doc.floors.find(s=>s.id===i.floor_id)?.name??""})}</p>`:w}`:w}
    </section>`}renderEnergyMarkers(){let e=this.floor;if(!e)return w;let t={inverter:"\u26A1",home_battery:"\u{1F50B}",wallbox:"\u{1F50C}",meter:"\u{1F4DF}",grid_point:"\u{1F3C1}"};return F`<g class="fp3d-energy-markers">${e.furniture.filter(n=>xe.includes(n.type)).map(n=>{let[i,s]=this.toScreen([n.x,n.z]),r=n.id===this._furnitureId;return F`<g data-energy-device=${n.id} class=${`fp3d-energy-marker${r?" fp3d-energy-marker-sel":""}`}>
          <circle cx=${i} cy=${s} r="17" />
          <text x=${i} y=${s+6} class="fp3d-energy-icon">${t[n.type]??"\u26A1"}</text>
          ${r?F`<text x=${i} y=${s+32} class="fp3d-energy-name">${this.t(`furn_${n.type}`)}</text>`:w}
          <title>${this.t(`furn_${n.type}`)}</title>
        </g>`})}</g>`}faceLabel(e){if(e.key===be)return this.t("solar_ground");if(e.wall){let i=this._doc.floors.find(s=>s.id===e.wall.floorId);return`${this.t("solar_wall")} ${i?.name??""} \xB7 ${this.t(`compass_${Vn(e,this._doc.settings.north??0)}`)} \xB7 ${C(this.hass,e.lu,1)} m`}let t=this._doc.settings.roof.sections??[],n=e.section?this.t("solar_section",{n:t.findIndex(i=>i.id===e.section)+1}):this.t("solar_main");return e.flat?`${n} \xB7 ${this.t("solar_flat")}`:`${n} \xB7 ${this.t(`compass_${Vn(e,this._doc.settings.north??0)}`)} \xB7 ${Math.round(e.pitch)}\xB0`}addSolarField(){if(!this.isAdmin)return;let e=q(this._doc),t=new Set((this._doc.settings.roof.solar??[]).map(r=>r.face)),n=this._doc.settings.north??0,i=Dt(e.filter(r=>!t.has(r.key)),n)??Dt(e,n);if(!i)return;let s=Ve(i,H("pv"));this.change(r=>r.settings.roof.solar=[...r.settings.roof.solar??[],s]),this._solarId=s.id,this._roofId=null}selectSolar(e){this._solarId=e,this._roofId=null;let t=this._doc.settings.roof.solar?.find(n=>n.id===e);t?.face.startsWith("wall:")&&(this._floorId=t.face.split(":")[1])}addWallField(){if(!this.isAdmin)return;let e=this._floorId??this._doc.floors[0]?.id,t=e?Vs(this._doc,H("pv"),e):null;t&&(this.change(n=>n.settings.roof.solar=[...n.settings.roof.solar??[],t]),this._solarId=t.id)}addGroundField(){if(!this.isAdmin)return;let e=Dn(this._doc,H("pv"));this.change(t=>t.settings.roof.solar=[...t.settings.roof.solar??[],e]),this._solarId=e.id}updateSolar(e){let t=this._solarId;!t||!this.isAdmin||this.change(n=>{let i=n.settings.roof.solar?.find(r=>r.id===t);if(!i)return;Object.assign(i,e);let s=te(n,i);s&&Object.assign(i,ct(s,i))})}setSolarString(e){let t=this._solarId;!t||!this.isAdmin||this.change(n=>{let i=n.settings.roof,s=i.solar?.find(a=>a.id===t);if(!s)return;if(e==="new"){let a=i.strings??[],l={id:H("str"),name:this.t("solar_string_n",{n:a.length+1}),entity:s.entity??null,inverter:null};i.strings=[...a,l],s.string=l.id}else s.string=e;let r=new Set((i.solar??[]).map(a=>a.string).filter(Boolean));i.strings=(i.strings??[]).filter(a=>r.has(a.id))})}updateSolarString(e){let n=this._doc.settings.roof.solar?.find(i=>i.id===this._solarId)?.string;!n||!this.isAdmin||this.change(i=>{let s=i.settings.roof.strings?.find(r=>r.id===n);s&&Object.assign(s,e)})}toggleSolarCell(e){this.updateSolarField(t=>{let n=new Set(t.skip??[]);n.has(e)?n.delete(e):n.add(e),t.skip=n.size?[...n].sort():null})}updateSolarField(e){let t=this._solarId;!t||!this.isAdmin||this.change(n=>{let i=n.settings.roof.solar?.find(s=>s.id===t);i&&e(i)})}deleteSolar(){let e=this._solarId;!e||!this.isAdmin||(this.change(t=>{let n=t.settings.roof;n.solar=(n.solar??[]).filter(s=>s.id!==e);let i=new Set(n.solar.map(s=>s.string).filter(Boolean));n.strings=(n.strings??[]).filter(s=>i.has(s.id))}),this._solarId=null)}renderSolarList(){let e=this._doc.settings.roof.solar??[],t=q(this._doc),n=new Map(e.map(s=>[s.id,te(this._doc,s,t)])),i=this.isAdmin;return v`<section>
      ${this.renderRoofFloors()}
      <h3>☀ ${this.t("solar_fields")}</h3>
      <p class="fp3d-sub">${this.t(t.length?"solar_hint":"solar_no_roof")}</p>
      ${e.length?v`<div class="fp3d-room-list">
            ${e.map((s,r)=>{let a=n.get(s.id),l=a?me(a,s).length:0;return v`<div class="fp3d-row">
                <button
                  class="fp3d-dev-name"
                  @click=${()=>this.selectSolar(s.id)}
                >
                  <span>${s.name||`${this.t("solar_field")} ${r+1}`} · ${a?this.faceLabel(a):this.t("solar_face_gone")} · ${this.t("solar_summary",{n:l,kwp:C(this.hass,l*.4,1)})}</span>
                </button>
              </div>`})}
          </div>`:w}
      <div class="fp3d-actions">
        <button class="fp3d-btn fp3d-primary" ?disabled=${!i||!t.length} @click=${()=>this.addSolarField()}>+ ${this.t("solar_add")}</button>
        <button class="fp3d-btn" ?disabled=${!i} @click=${()=>this.addGroundField()}>+ ${this.t("solar_add_ground")}</button>
        <button class="fp3d-btn" ?disabled=${!i||!this._floorId} @click=${()=>this.addWallField()}>+ ${this.t("solar_add_wall")}</button>
      </div>
      ${(this._doc.settings.roof.strings??[]).length?v`<h4 class="fp3d-lib-head">${this.t("solar_strings")}</h4>
            ${(this._doc.settings.roof.strings??[]).map(s=>{let r=e.filter(l=>l.string===s.id),a=r.reduce((l,c)=>l+(n.get(c.id)?me(n.get(c.id),c).length:0),0);return v`<p class="fp3d-sub">🔗 <b>${s.name}</b> · ${this.t("solar_string_sum",{fields:r.length,n:a,kwp:C(this.hass,a*.4,1)})}</p>`})}`:w}
    </section>`}renderSolarForm(e){let t=this.isAdmin,n=q(this._doc),i=de(this._doc),s=te(this._doc,e,n),r=e.face===be,a=s?me(s,e).length:0,l=Tt(e),c=l.reduce((g,f)=>g+f,0)-(e.skip?.length??0),d=this.entityOptions(g=>g.startsWith("sensor.")&&this.hass?.states[g]?.attributes.device_class==="power"),h=g=>this.updateSolar(g),p=(this._doc.settings.roof.solar??[]).findIndex(g=>g.id===e.id)+1;return v`<button class="fp3d-btn fp3d-back" @click=${()=>this._solarId=null}>‹ ${this.t("solar_fields")}</button>
      <section>
        ${this.renderRoofFloors()}
        <div class="fp3d-h3row">
          <h3>☀ ${e.name||`${this.t("solar_field")} ${p}`}</h3>
          ${t?v`<button class="fp3d-btn fp3d-fix" aria-pressed=${!!e.locked} title=${this.t("fix_hint")} @click=${()=>this.updateSolar({locked:!e.locked})}>
                ${e.locked?`\u{1F512} ${this.t("unfix")}`:`\u{1F513} ${this.t("fix")}`}
              </button>`:w}
        </div>
        <div class="fp3d-form">
          <label class="fp3d-field fp3d-wide"
            >${this.t("solar_name")}
            <input
              type="text"
              ?disabled=${!t}
              .value=${e.name??""}
              placeholder=${this.t("solar_name_hint")}
              @change=${g=>h({name:g.target.value.trim()||null})}
          /></label>
          <label class="fp3d-field fp3d-wide"
            >${this.t("solar_face")}
            <select
              ?disabled=${!t}
              @change=${g=>{let f=g.target.value,u={portrait:e.portrait,look:e.look,name:e.name,string:e.string,entity:e.entity,module_w:e.module_w,module_h:e.module_h};f===be&&h({...Dn(this._doc,e.id),...u});let y=n.find(m=>m.key===f);y&&h({...Ve(y,e.id),...u,rotation:null,flip:!1});let b=i.find(m=>m.key===f);b&&h({...Ve(b,e.id),...u,rows:1,rotation:null,flip:!1})}}
            >
              ${s?w:v`<option selected>${this.t("solar_face_gone")}</option>`}
              ${n.map(g=>v`<option value=${g.key} ?selected=${g.key===e.face}>${this.faceLabel(g)}</option>`)}
              <option value=${be} ?selected=${r}>${this.t("solar_ground")}</option>
              ${i.map(g=>v`<option value=${g.key} ?selected=${g.key===e.face}>${this.faceLabel(g)}</option>`)}
            </select></label
          >
          ${this.num(this.t("solar_rows"),l.length,g=>{let f=Math.max(1,Math.min(40,Math.round(g)));h(e.layout?.length?{layout:Array.from({length:f},(u,y)=>e.layout[y]??e.layout[e.layout.length-1]),rows:f}:{rows:f})},1,1)}
          <label class="fp3d-field"
            >${this.t("solar_cols")}
            <input
              type="text"
              inputmode="numeric"
              ?disabled=${!t}
              .value=${e.layout?.length?e.layout.join(", "):String(e.cols)}
              title=${this.t("solar_cols_hint")}
              @change=${g=>{let f=g.target.value.split(/[,;\s]+/).map(u=>parseInt(u,10)).filter(u=>Number.isFinite(u)&&u>=0);f.length&&(f.length===1?h({cols:Math.max(1,Math.min(60,f[0])),layout:null,skip:null}):h({layout:f.slice(0,40).map(u=>Math.min(60,u)),rows:Math.min(40,f.length),cols:Math.max(1,...f),skip:null}))}}
          /></label>
        </div>
        <p class="fp3d-sub">
          ${s&&!s.unbounded?v`${this.t("solar_face_size",{w:C(this.hass,s.lu,1),h:C(this.hass,s.ls,1)})} · `:w}${this.t("solar_cols_hint")}
        </p>
        ${e.layout?.length&&new Set(e.layout).size>1?v`<div class="fp3d-seg fp3d-dev-source">
              ${["left","center","right"].map(g=>v`<button aria-pressed=${(e.align??"left")===g} ?disabled=${!t} @click=${()=>h({align:g})}>${this.t(`solar_align_${g}`)}</button>`)}
            </div>`:w}
        <div class="fp3d-seg fp3d-dev-source">
          <button aria-pressed=${e.portrait!==!1} ?disabled=${!t} @click=${()=>h({portrait:!0})}>${this.t("solar_portrait")}</button>
          <button aria-pressed=${e.portrait===!1} ?disabled=${!t} @click=${()=>h({portrait:!1})}>${this.t("solar_landscape")}</button>
        </div>
        <div class="fp3d-seg fp3d-dev-source">
          <button aria-pressed=${e.look!=="blue"} ?disabled=${!t} @click=${()=>h({look:"black"})}>${this.t("solar_look_black")}</button>
          <button aria-pressed=${e.look==="blue"} ?disabled=${!t} @click=${()=>h({look:"blue"})}>${this.t("solar_look_blue")}</button>
        </div>
        <div class="fp3d-form">
          ${this.num(this.t("solar_module_w"),e.module_w??1.13,g=>h({module_w:Math.max(.3,Math.min(3,M(g)))}),.01,.3)}
          ${this.num(this.t("solar_module_h"),e.module_h??1.72,g=>h({module_h:Math.max(.3,Math.min(3,M(g)))}),.01,.3)}
        </div>
        <div class="fp3d-actions">
          <button class="fp3d-btn" aria-pressed=${this._solarPick} ?disabled=${!t} @click=${()=>this._solarPick=!this._solarPick}>${this._solarPick?"\u2713 ":""}${this.t("solar_pick")}</button>
          ${e.skip?.length?v`<button class="fp3d-btn" ?disabled=${!t} @click=${()=>h({skip:null})}>${this.t("solar_pick_all")}</button>`:w}
        </div>
        ${this._solarPick?v`<p class="fp3d-sub">${this.t("solar_pick_hint")}</p>`:w}
        <div class="fp3d-form">
          ${r?v`${this.num(this.t("solar_base"),e.base??0,g=>h({base:g>.001?Math.min(60,M(g)):null}),.05,0)}
                ${this.num(this.t("solar_rotation"),e.rotation??0,g=>h(dt(this._doc,e,g)),5)}
                <div class="fp3d-actions">
                  <button class="fp3d-chip" ?disabled=${!t} @click=${()=>h(dt(this._doc,e,(e.rotation??0)-15))}>↺ 15°</button>
                  <button class="fp3d-chip" ?disabled=${!t} @click=${()=>h(dt(this._doc,e,(e.rotation??0)+15))}>↻ 15°</button>
                </div>`:v`${this.num(this.t("solar_u"),e.u,g=>h({u:M(g)}),.05)} ${this.num(this.t(s?.wall?"solar_v_wall":"solar_v"),e.v,g=>h({v:M(g)}),.05)}`}
          ${s?.wall?v`${this.num(this.t("solar_tilt_wall"),e.tilt??0,g=>h({tilt:Math.max(0,Math.min(90,Math.round(g)))}),5,0)}
                <label class="fp3d-check fp3d-wide"
                  ><input type="checkbox" ?disabled=${!t} .checked=${!!e.flip} @change=${g=>h({flip:g.target.checked})} />
                  ${this.t("solar_flip_wall")}</label
                >`:w}
          ${s?.flat?v`${this.num(this.t("solar_tilt"),e.tilt??15,g=>h({tilt:Math.max(0,Math.min(45,Math.round(g)))}),1,0)}
                <label class="fp3d-check fp3d-wide"
                  ><input type="checkbox" ?disabled=${!t} .checked=${!!e.flip} @change=${g=>h({flip:g.target.checked})} />
                  ${this.t("solar_flip")}</label
                >`:w}
        </div>
        <p class="fp3d-sub">
          ${this.t("solar_summary",{n:a,kwp:C(this.hass,a*.4,1)})}${a<c?v` · <b>${this.t("solar_partial",{n:a,total:c})}</b>`:w}
        </p>
        <h4 class="fp3d-lib-head">🔗 ${this.t("solar_string")}</h4>
        <div class="fp3d-form">
          <label class="fp3d-field fp3d-wide"
            >${this.t("solar_string")}
            <select ?disabled=${!t} @change=${g=>{let f=g.target.value;this.setSolarString(f===""?null:f)}}>
              <option value="" ?selected=${!e.string}>${this.t("solar_string_none")}</option>
              ${(this._doc.settings.roof.strings??[]).map(g=>v`<option value=${g.id} ?selected=${g.id===e.string}>${g.name}</option>`)}
              <option value="new">+ ${this.t("solar_string_new")}</option>
            </select></label
          >
          ${(()=>{let g=this._doc.settings.roof.strings?.find(u=>u.id===e.string);if(!g)return this.entitySelect(this.t("solar_entity"),e.entity??null,void 0,d,u=>h({entity:u==="none"?null:u}));let f=this._doc.floors.flatMap(u=>u.furniture.filter(y=>y.type==="inverter").map((y,b)=>({id:y.id,label:`${this.t("furn_inverter")} ${b+1} \xB7 ${u.name}`})));return v`<label class="fp3d-field fp3d-wide"
                >${this.t("solar_string_name")}
                <input type="text" ?disabled=${!t} .value=${g.name} @change=${u=>this.updateSolarString({name:u.target.value.trim()||g.name})}
              /></label>
              ${this.entitySelect(this.t("solar_string_entity"),g.entity??null,void 0,d,u=>this.updateSolarString({entity:u==="none"?null:u}))}
              <label class="fp3d-field fp3d-wide"
                >${this.t("solar_string_inverter")}
                <select ?disabled=${!t} @change=${u=>this.updateSolarString({inverter:u.target.value||null})}>
                  <option value="" ?selected=${!g.inverter}>${this.t(f.length?"solar_string_inverter_none":"solar_string_inverter_missing")}</option>
                  ${f.map(u=>v`<option value=${u.id} ?selected=${u.id===g.inverter}>${u.label}</option>`)}
                </select></label
              >`})()}
        </div>
        <p class="fp3d-sub">${this.t("solar_string_hint")}</p>
        <p class="fp3d-sub">${this.t("solar_form_hint")}</p>
        ${t?v`<div class="fp3d-actions">
              <button class="fp3d-btn" ?disabled=${!s} @click=${()=>s&&h({...Ve(s,e.id),portrait:e.portrait})}>${this.t("solar_fit")}</button>
              <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteSolar()}>${this.t("delete")}</button>
            </div>`:w}
      </section>`}renderRoofPanel(){let e=this._doc.settings.roof,t=this.isAdmin,n=e.type==="custom"?this.roofSection:void 0,i=this._roofWinId?e.windows?.find(r=>r.id===this._roofWinId):void 0;if(i)return this.renderRoofWindowForm(i);if(n)return this.renderRoofSectionForm(n);let s=e.type==="custom"?e.sections??[]:[];return v`<section>
      ${this.renderRoofFloors()}
      <h3>${this.t("roof_sections")}</h3>
      <p class="fp3d-sub">${this.t("roof_sections_hint")}</p>
      ${e.type!=="custom"?v`<div class="fp3d-actions"><button class="fp3d-btn fp3d-primary" ?disabled=${!t} @click=${()=>this.useRoofSections()}>${this.t("roof_sections_start")}</button></div>`:v`<div class="fp3d-room-list">
              ${s.map((r,a)=>v`<div class="fp3d-row">
                  <button class="fp3d-dev-name" @click=${()=>this._roofId=r.id}>
                    <span>${a+1} · ${this.t(`roof_shape_${r.shape}`)} · ${C(this.hass,Math.abs(r.x1-r.x0),1)} × ${C(this.hass,Math.abs(r.z1-r.z0),1)} m · ${this.t("roof_ridge_height")} ${C(this.hass,At(r),1)} m</span>
                  </button>
                </div>`)}
            </div>
            <div class="fp3d-actions">
              <button class="fp3d-btn" ?disabled=${!t} @click=${()=>this.useRoofSections(!0)}>${this.t("roof_sections_regen")}</button>
              <button class="fp3d-btn" ?disabled=${!t} @click=${()=>this.change(r=>r.settings.roof.type="gable")}>${this.t("roof_sections_off")}</button>
            </div>`}
    </section>
    ${this.renderRoofWindowList()}`}renderEnergyPanel(){let e=this._solarId?this._doc.settings.roof.solar?.find(i=>i.id===this._solarId):void 0;if(e)return this.renderSolarForm(e);let t=this._furnitureId?this.floor?.furniture.find(i=>i.id===this._furnitureId&&xe.includes(i.type)):void 0;if(t)return v`<button class="fp3d-btn fp3d-back" @click=${()=>this.selectItem("furniture",null)}>‹ ${this.t("tool_energy")}</button>
        ${this.renderFurnitureForm(t)}`;let n=st("energy_pro");return v`${this.renderSolarList()}${this.renderEnergyDevices()}${this.renderEnergyBalance()}${n?this.renderCableSettings():w}${n?this.renderHologramSettings():w}${this.renderSolarProTeaser()}`}renderHologramSettings(){let e=this._doc.settings.roof.solar??[];if(!e.length)return w;let t=this.isAdmin,n=this._doc.settings.roof.hologram??ln,i=r=>this.change(a=>a.settings.roof.hologram={...a.settings.roof.hologram??ln,...r}),s=(r,a)=>r.name||`${this.t("solar_field")} ${a+1}`;return v`<section>
      <h3>◈ ${this.t("holo_settings")}</h3>
      <p class="fp3d-sub">${this.t("holo_settings_hint")}</p>
      <div class="fp3d-form">
        <label class="fp3d-field fp3d-wide"
          >${this.t("holo_field")}
          <select ?disabled=${!t} @change=${r=>i({field:r.target.value||null})}>
            <option value="" ?selected=${!n.field}>${this.t("holo_field_auto")}</option>
            ${e.map((r,a)=>v`<option value=${r.id} ?selected=${r.id===n.field}>${s(r,a)}</option>`)}
          </select>
        </label>
        ${this.num(this.t("holo_size"),n.size,r=>i({size:Math.min(3,Math.max(.3,M(r)))}),.1,.3)}
        ${this.num(this.t("holo_right"),n.right,r=>i({right:Math.min(30,Math.max(-30,M(r)))}),.25)}
        ${this.num(this.t("holo_up"),n.up,r=>i({up:Math.min(30,Math.max(-30,M(r)))}),.25)}
      </div>
    </section>`}renderSolarProTeaser(){let e=new URL("./images/solar-pro.jpg",import.meta.url).href;return v`<section class="fp3d-teaser">
      <div class="fp3d-teaser-head"><b>☀ ${this.t("solar_pro_title")}</b><span class="fp3d-teaser-soon">${this.t("solar_pro_soon")}</span></div>
      <img src=${e} alt=${this.t("solar_pro_title")} loading="lazy" />
      <ul>
        <li>${this.t("solar_pro_1")}</li>
        <li>${this.t("solar_pro_2")}</li>
        <li>${this.t("solar_pro_3")}</li>
        <li>${this.t("solar_pro_4")}</li>
      </ul>
      <p class="fp3d-sub">${this.t("solar_pro_free")}</p>
    </section>`}addEnergyDevice(e){let t=this.floor;if(!t||!this.isAdmin)return;if(e==="grid_point"){let m=jn(this._doc),[_,k,$]=Je(e),[S,z]=m?m.end:this.toWorld(this._size.w/2,this._size.h/2),A={id:H("furniture"),type:e,x:M(S),z:M(z),rotation:0,w:_,d:k,h:$,variant:null};this.change((I,x)=>x.furniture.push(A)),this.selectItem("furniture",A.id),this.showPoint(A.x,A.z);return}let n=m=>`${m.name} ${m.area_id&&this.hass?.areas?.[m.area_id]?.name||""} ${m.area_id??""}`.toLowerCase(),i=t.rooms.filter(m=>m.points.length>=3),s=m=>i.find(_=>m.test(n(_))),r=i.find(m=>t.furniture.some(_=>_.type==="parking"&&D([_.x,_.z],m.points))),a=s(/garage|carport/)??r,l=s(/hwr|hauswirt|technik|keller|abstell|utility|basement|boiler|heiz/),c=s(/flur|diele|eingang|hall|entr|lobby/),d=(e==="wallbox"?a:e==="meter"?l??c??a:l??a)??this.room??i.sort((m,_)=>Math.abs(Q(_.points))-Math.abs(Q(m.points)))[0],[h,p,g]=Je(e),[f,u]=d?le(d.points):this.toWorld(this._size.w/2,this._size.h/2);if(d){let[m,_]=le(d.points),k=null,$=new Set(t.openings.filter(A=>A.room_id===d.id).map(A=>A.edge)),S=d.points.some((A,I)=>!$.has(I));d.points.forEach((A,I)=>{if(S&&$.has(I))return;let x=d.points[(I+1)%d.points.length],E=Math.hypot(x[0]-A[0],x[1]-A[1]);if(k&&E<=k.l)return;let R=(A[0]+x[0])/2,T=(A[1]+x[1])/2,P=-(x[1]-A[1])/E,O=(x[0]-A[0])/E;(m-R)*P+(_-T)*O<0&&([P,O]=[-P,-O]),k={mx:R,mz:T,nx:P,nz:O,l:E}});let z=k;z&&([f,u]=[z.mx+z.nx*(p/2+.25),z.mz+z.nz*(p/2+.25)])}let y={id:H("furniture"),type:e,x:M(f),z:M(u),rotation:0,w:h,d:p,h:g,variant:null},b=d?Et({...t,furniture:[...t.furniture,y]},y,this._doc.settings.wall_interior):null;b&&Object.assign(y,{x:M(b.x),z:M(b.z),rotation:b.rotation}),this.change((m,_)=>_.furniture.push(y)),this.selectItem("furniture",y.id),this.showPoint(y.x,y.z)}renderEnergyDevices(){let e=this.isAdmin,t=this._doc.floors.flatMap(n=>n.furniture.filter(i=>xe.includes(i.type)).map(i=>({fl:n,m:i})));return v`<section>
      <h3>⚡ ${this.t("energy_devices")}</h3>
      <p class="fp3d-sub">${this.t("energy_devices_hint")}</p>
      ${t.length?v`<div class="fp3d-room-list">
            ${t.map(({fl:n,m:i})=>v`<div class="fp3d-row">
                <button
                  class="fp3d-dev-name"
                  @click=${()=>{this._floorId=n.id,this._solarId=null,this.selectItem("furniture",i.id),this.showPoint(i.x,i.z)}}
                >
                  <span>${i.name||this.t(`furn_${i.type}`)} · ${n.name}</span>
                </button>
              </div>`)}
          </div>`:w}
      <div class="fp3d-actions">
        ${xe.map(n=>v`<button
            class="fp3d-btn"
            ?disabled=${!e||!this.floor}
            @click=${()=>{this._solarId=null,this.addEnergyDevice(n)}}
          >
            + ${this.t(`furn_${n}`)}
          </button>`)}
      </div>
    </section>`}renderRoofSectionForm(e){let t=this.isAdmin,n=p=>this.updateRoofSection(p),i=e.axis==="x"?[this.t("roof_side_top"),this.t("roof_side_bottom")]:[this.t("roof_side_left"),this.t("roof_side_right")],[s,r]=e.flip?[i[1],i[0]]:i,a=e.shape==="flat",l=e.shape==="pent",c=p=>p.findIndex(g=>g.id===e.id)+1,d=(p,g,f,u=.05,y=0)=>this.num(p,g,b=>f(Math.max(y,M(b))),u,y),h=!!this._doc.settings.lock_plan;return v`<button class="fp3d-btn fp3d-back" @click=${()=>this._roofId=null}>‹ ${this.t("roof_sections")}</button>
      <section>
        ${this.renderRoofFloors()}
        <div class="fp3d-h3row">
          <h3>${this.t("roof_section")} ${c(this._doc.settings.roof.sections??[])}</h3>
          ${t?h?v`<button class="fp3d-btn fp3d-fix" aria-pressed="true" title=${this.t("lock_plan_hint")} @click=${()=>this.toggleLockPlan()}>🔒 ${this.t("plan_locked")}</button>`:v`<button class="fp3d-btn fp3d-fix" aria-pressed=${!!e.locked} title=${this.t("fix_hint")} @click=${()=>n({locked:!e.locked})}>
                  ${e.locked?`\u{1F512} ${this.t("unfix")}`:`\u{1F513} ${this.t("fix")}`}
                </button>`:w}
        </div>
        <div class="fp3d-seg fp3d-dev-source">
          ${Vi.map(p=>v`<button aria-pressed=${e.shape===p} ?disabled=${!t} @click=${()=>n({shape:p})}>${this.t(`roof_shape_${p}`)}</button>`)}
        </div>
        ${a?w:v`<div class="fp3d-seg fp3d-dev-source">
              <button aria-pressed=${e.axis==="x"} ?disabled=${!t} @click=${()=>n({axis:"x"})}>${this.t("roof_axis_x")}</button>
              <button aria-pressed=${e.axis==="z"} ?disabled=${!t} @click=${()=>n({axis:"z"})}>${this.t("roof_axis_z")}</button>
            </div>`}
        <label class="fp3d-check fp3d-wide" title=${this.t("roof_open_hint")}
          ><input type="checkbox" .checked=${!!e.open} ?disabled=${!t} @change=${p=>n({open:p.target.checked})} />
          ${this.t("roof_open")}</label
        >
        <div class="fp3d-form">
          ${a?d(this.t("roof_height"),e.eave_a,p=>n({eave_a:p,eave_b:p})):v`${d(`${this.t("roof_eave")} ${l?"":s}`,e.eave_a,p=>n({eave_a:p}))}
              ${l?w:d(`${this.t("roof_eave")} ${r}`,e.eave_b,p=>n({eave_b:p}))}
              ${d(`${this.t("roof_pitch_short")} ${l?"":s}`,e.pitch_a,p=>n({pitch_a:Math.min(75,p)}),1,0)}
              ${l?w:d(`${this.t("roof_pitch_short")} ${r}`,e.pitch_b,p=>n({pitch_b:Math.min(75,p)}),1,0)}`}
          ${d(this.t("roof_base"),e.base,p=>n({base:p}))}
          ${d(this.t("roof_overhang"),e.overhang??this._doc.settings.roof.overhang,p=>n({overhang:Math.min(2,p)}),.05,0)}
        </div>
        <p class="fp3d-sub">${this.t("roof_ridge_height")}: ${C(this.hass,At(e),2)} m · ${this.t("roof_section_hint")}</p>
        ${t?v`<div class="fp3d-actions">
              ${a?w:v`<button class="fp3d-btn" title=${this.t("roof_swap_hint")} @click=${()=>n({flip:!e.flip})}>⇅ ${this.t("roof_swap")}</button>`}
              <button class="fp3d-btn" @click=${()=>this.duplicateRoofSection()}>${this.t("duplicate")}</button>
              <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteRoofSection()}>${this.t("delete")}</button>
            </div>`:w}
      </section>`}fixItem(e,t,n){if(e)switch(t){case"room":return e.rooms.find(i=>i.id===n);case"opening":return e.openings.find(i=>i.id===n);case"furniture":return e.furniture.find(i=>i.id===n);case"device":return e.placements.find(i=>i.entity_id===n);case"wall":return(e.walls??[]).find(i=>i.id===n);case"outdoor":return e.outdoor.find(i=>i.id===n)}}isFixedItem(e,t){return cn(this.fixItem(this.floor,e,t),e!=="furniture"&&e!=="device",this._doc.settings)}toggleFixed(e,t){if(!this.isAdmin||e!=="furniture"&&e!=="device")return;let n=!this.isFixedItem(e,t);this.change((i,s)=>{let r=this.fixItem(s,e,t);r&&(r.locked=n)})}toggleLockPlan(){this.isAdmin&&this.change(e=>e.settings.lock_plan=!e.settings.lock_plan)}get selectedFix(){return this._deviceId?{kind:"device",id:this._deviceId}:this._openingId?{kind:"opening",id:this._openingId}:this._furnitureId?{kind:"furniture",id:this._furnitureId}:this._wallId?{kind:"wall",id:this._wallId}:this._outdoorId?{kind:"outdoor",id:this._outdoorId}:this._roomId?{kind:"room",id:this._roomId}:null}confirmFixedDelete(e,t){return!this.isFixedItem(e,t)||confirm(this.t("fixed_delete_confirm"))}onContextMenu(e){e.preventDefault(),!(this._tool!=="select"&&this._tool!=="furniture")&&(this.drag=null,this.openContext(e.target,this.localPoint(e)))}openContext(e,t){if(!this.isAdmin||!this.floor)return;let n=this.toWorld(...t),i=f=>e.closest(`[${f}]`)?.getAttribute(f)??null,s=null,r=i("data-device"),a=i("data-opening"),l=e.closest("[data-vertex], [data-mid]")?null:i("data-furniture"),c=i("data-free-wall"),d=i("data-outdoor"),h=i("data-room")??this.roomAt(n);if(r?s=["device",r]:a?s=["opening",a]:l?s=["furniture",l]:c?s=["wall",c]:d&&!h?s=["outdoor",d]:h&&(s=["room",h]),!s){this._ctx=null;return}let[p,g]=s;this.selectItem(p,g),(p==="opening"||p==="furniture")&&(this._roomId=this._roomId??h),this._ctx={x:t[0],y:t[1],kind:p,id:g}}deleteItem(e,t){if(e==="device"){if(!this.confirmFixedDelete(e,t))return;this.removeDevice(t),this._deviceId=null;return}e==="room"?this.deleteRoom():e==="opening"?this.deleteOpening():e==="furniture"?this.deleteFurniture():e==="wall"?this.deleteFreeWall():this.deleteOutdoor()}renderContext(){let e=this._ctx;if(!e)return w;let t=this.isFixedItem(e.kind,e.id),n=this.renderRoot.querySelector(".fp3d-canvas-wrap"),i=Math.max(4,Math.min(e.x,(n?.clientWidth??800)-190)),s=Math.max(4,Math.min(e.y,(n?.clientHeight??600)-190)),r=a=>()=>{this._ctx=null,a()};return v`<div class="fp3d-ctx" style=${`left:${i}px;top:${s}px`} @pointerdown=${a=>a.stopPropagation()} @contextmenu=${a=>a.preventDefault()}>
      ${e.kind==="furniture"||e.kind==="device"?v`<button title=${this.t("fix_hint")} @click=${r(()=>this.toggleFixed(e.kind,e.id))}>${t?`\u{1F513} ${this.t("unfix")}`:`\u{1F512} ${this.t("fix")}`}</button>`:v`<button title=${this.t("lock_plan_hint")} @click=${r(()=>this.toggleLockPlan())}>${this._doc.settings.lock_plan?`\u{1F513} ${this.t("plan_unlock")}`:`\u{1F512} ${this.t("plan_lock")}`}</button>`}
      ${e.kind==="room"?v`<button @click=${r(()=>this.duplicateRoom())}>⧉ ${this.t("duplicate")}</button>`:w}
      ${e.kind==="furniture"?v`<button @click=${r(()=>this.duplicateFurniture())}>⧉ ${this.t("duplicate")}</button>
            <button ?disabled=${t} @click=${r(()=>this.rotateFurniture(90))}>↻ ${this.t("ctx_rotate")}</button>`:w}
      <button class="fp3d-ctx-danger" @click=${r(()=>this.deleteItem(e.kind,e.id))}>✕ ${this.t("delete")}</button>
    </div>`}fixButton(e,t){if(!this.isAdmin)return w;if(e!=="furniture"&&e!=="device")return this._doc.settings.lock_plan?v`<button class="fp3d-btn fp3d-fix" aria-pressed="true" title=${this.t("lock_plan_hint")} @click=${()=>this.toggleLockPlan()}>
            🔒 ${this.t("plan_locked")}
          </button>`:w;let n=this.isFixedItem(e,t);return v`<button class="fp3d-btn fp3d-fix" aria-pressed=${n} title=${this.t("fix_hint")} @click=${()=>this.toggleFixed(e,t)}>
      ${n?`\u{1F512} ${this.t("unfix")}`:`\u{1F513} ${this.t("fix")}`}
    </button>`}selectItem(e,t){if(this._notice=null,t&&(this._sideOpen=!0),this._outdoorId=e==="outdoor"?t:null,this._wallId=e==="wall"?t:null,this._edgeHi=null,(e==="outdoor"||e==="wall")&&(this._roomId=null),(e!=="room"||t!==this._roomId)&&(this._vertex=null),this._roomId=e==="room"?t:this._roomId,this._openingId=e==="opening"?t:null,this._furnitureId=e==="furniture"?t:null,this._deviceId=e==="device"?t:null,e==="device"&&t){let n=this.floor?.placements.find(i=>i.entity_id===t);this._roomId=(n&&this.roomAt([n.x,n.z]))??this._roomId}e==="opening"&&t&&(this._roomId=this.floor?.openings.find(n=>n.id===t)?.room_id??this._roomId)}get opening(){return this._openingId?this.floor?.openings.find(e=>e.id===this._openingId):void 0}get furnitureItem(){return this._furnitureId?this.floor?.furniture.find(e=>e.id===this._furnitureId):void 0}offsetOnEdge(e,t,n,i,s){let r=e.points[t],a=e.points[(t+1)%e.points.length],l=Math.hypot(a[0]-r[0],a[1]-r[1])||1,c=((n[0]-r[0])*(a[0]-r[0])+(n[1]-r[1])*(a[1]-r[1]))/l,d=s?.01:this._doc.settings.grid,h=Math.min(i,l)/2;return M(Math.min(l-h,Math.max(h,Math.round(c/d)*d)))}placeOpening(e,t){let n=this.floor;if(!n||!this.isAdmin)return!1;let i=null;for(let u of n.walls??[]){let y=De({room_id:"",edge:0,wall:u.id},n.rooms,n.walls??[]);if(!y)continue;let[b,m]=this.toScreen(u.a),[_,k]=this.toScreen(u.b),$=(_-b)**2+(k-m)**2||1,S=Math.min(1,Math.max(0,((t[0]-b)*(_-b)+(t[1]-m)*(k-m))/$)),z=Math.hypot(t[0]-b-(_-b)*S,t[1]-m-(k-m)*S),A=[(u.a[0]+u.b[0])/2,(u.a[1]+u.b[1])/2],I=n.rooms.find(x=>x.points.length>=3&&D(A,x.points));z<Vt*2.2&&(!i||z-1<i.d)&&(i={room:y.room,edge:0,d:z-1,wall:u.id,roomId:I?.id??u.id})}for(let u of n.rooms)for(let y=0;y<u.points.length;y++){let[b,m]=this.toScreen(u.points[y]),[_,k]=this.toScreen(u.points[(y+1)%u.points.length]),$=(_-b)**2+(k-m)**2||1,S=Math.min(1,Math.max(0,((t[0]-b)*(_-b)+(t[1]-m)*(k-m))/$)),z=Math.hypot(t[0]-b-(_-b)*S,t[1]-m-(k-m)*S),A=z-(u.id===this._roomId?.5:0);z<Vt*2.2&&(!i||A<i.d)&&(i={room:u,edge:y,d:A})}if(!i)return!1;let{room:s,edge:r,wall:a}=i,l=s.points[r],c=s.points[(r+1)%s.points.length],d=Math.hypot(c[0]-l[0],c[1]-l[1]),h=kt[e],p=h.type,g=M(Math.min(h.width,Math.max(.3,d-.1))),f={id:H("opening"),room_id:i.roomId??s.id,edge:r,...a?{wall:a}:{},offset:this.offsetOnEdge(s,r,this.toWorld(...t),g,!1),width:g,type:p,sill:h.sill,height:h.height,hinge:"left",leaves:h.leaves,swing:"in",cover:null,contact:null,contact2:null,tilt:null};return this.change((u,y)=>y.openings.push(f)),this._tool="select",this.selectItem("opening",f.id),!0}setOpeningPreset(e,t){let n=kt[t];this._openingPreset=t;let i=_n(e)===t,s="style"in n?n.style:null;this.updateOpening({type:n.type,leaves:n.leaves,sill:n.sill,height:n.height,style:s,...i?{}:{width:n.width}})}updateOpening(e){let t=this._openingId;this.change((n,i)=>Object.assign(i.openings.find(s=>s.id===t),e))}deleteOpening(){let e=this._openingId;!e||!this.isAdmin||!this.confirmFixedDelete("opening",e)||(this.change((t,n)=>n.openings=n.openings.filter(i=>i.id!==e)),this._openingId=null)}addFurniture(e){let t=this.floor;if(!t||!this.isAdmin)return;let[n,i,s]=Je(e),r=this._doc.floors.filter(p=>p.elevation>t.elevation).sort((p,g)=>p.elevation-g.elevation)[0],a=e==="stairs"?M(r?r.elevation-t.elevation:t.height+.25):s,l=this.room,[c,d]=l?le(l.points):this.toWorld(this._size.w/2,this._size.h/2),h={id:H("furniture"),type:e,x:M(c),z:M(d),rotation:0,w:n,d:i,h:a,variant:null};this.change((p,g)=>g.furniture.push(h)),this.selectItem("furniture",h.id),this.showPoint(h.x,h.z)}snapToWall(e){return this.floor?Et(this.floor,e,this._doc.settings.wall_interior):null}updateFurniture(e){let t=this._furnitureId;this.change((n,i)=>Object.assign(i.furniture.find(s=>s.id===t),e))}rotateFurniture(e){let t=this.furnitureItem;!t||!this.isAdmin||this.updateFurniture({rotation:((t.rotation+e)%360+360)%360})}deleteFurniture(){let e=this._furnitureId;!e||!this.isAdmin||!this.confirmFixedDelete("furniture",e)||(this.change((t,n)=>n.furniture=n.furniture.filter(i=>i.id!==e)),this._furnitureId=null)}duplicateFurniture(){let e=this.furnitureItem;if(!e||!this.isAdmin)return;let t={...structuredClone(e),id:H("furniture"),x:M(e.x+.3),z:M(e.z+.3)};this.change((n,i)=>i.furniture.push(t)),this.selectItem("furniture",t.id)}placeDevices(e){let t=this.room;if(!t||!e.length||!this.isAdmin)return;let n=new Set(e);this.change((i,s)=>{for(let a of i.floors)a.placements=a.placements.filter(l=>!n.has(l.entity_id)),a.furniture=a.furniture.filter(l=>!(ue(l.type)&&l.entity&&n.has(l.entity)));let r=[...s.placements.map(a=>[a.x,a.z]),...s.furniture.filter(a=>ue(a.type)).map(a=>[a.x,a.z])];for(let a of gs(t,e,r)){if(!a.entity_id.startsWith("light.")){s.placements.push(a);continue}let[l,c,d]=ae.lamp_ceiling;s.furniture.push({id:H("furniture"),type:"lamp_ceiling",x:a.x,z:a.z,rotation:0,w:l,d:c,h:d,variant:null,entity:a.entity_id,power:null})}})}get device(){return this._deviceId?this.floor?.placements.find(e=>e.entity_id===this._deviceId):void 0}updateDevice(e){let t=this._deviceId;this.change((n,i)=>Object.assign(i.placements.find(s=>s.entity_id===t),e))}centreDevice(){let e=this.device,t=e?this.roomAt([e.x,e.z]):null,n=this.floor?.rooms.find(r=>r.id===t);if(!e||!n)return;let[i,s]=le(n.points);this.updateDevice({x:M(i),z:M(s)})}spreadCeilingLights(e){let t=this.floor;if(!t)return;let n=t.placements.filter(h=>V(h.entity_id)==="light"&&(h.mount??"ceiling")==="ceiling"&&D([h.x,h.z],e.points));if(n.length<2)return;let i=ie(e.points),s=i.x1-i.x0,r=i.z1-i.z0,a=Math.max(1,Math.round(Math.sqrt(n.length*s/Math.max(.1,r)))),l=Math.ceil(n.length/a),c=n.map((h,p)=>{let g=Math.floor(p/a),f=g===l-1?n.length-a*(l-1):a,u=p-g*a;return[M(i.x0+s/f*(u+.5)),M(i.z0+r/l*(g+.5))]}),d=n.map(h=>h.entity_id);this.change((h,p)=>{d.forEach((g,f)=>Object.assign(p.placements.find(u=>u.entity_id===g),{x:c[f][0],z:c[f][1]}))})}closeFloorGaps(){let e=this.floor;if(!e||!this.isAdmin)return;let{rooms:t,gaps:n}=$s(e.rooms);if(!n.length){this._notice=this.t("gaps_none");return}let i=xs(n);this.change((s,r)=>{r.rooms=t,i&&(s.settings.wall_interior=i)}),this._notice=i?this.t("gaps_closed_wall",{n:n.length,t:C(this.hass,i,2)}):this.t("gaps_closed",{n:n.length})}removeDevice(e){this.change(t=>{for(let n of t.floors)n.placements=n.placements.filter(i=>i.entity_id!==e),n.furniture=n.furniture.filter(i=>!(ue(i.type)&&i.entity===e))})}deleteVertex(e){let t=this.room;if(!t||t.points.length<=3)return;let n=t.points.length,i=(e-1+n)%n;this.change((s,r)=>{let a=r.rooms.find(l=>l.id===t.id);a.points.splice(e,1),a.wall_heights&&a.wall_heights.splice(e,1),r.openings=r.openings.filter(l=>l.room_id!==t.id||l.wall||l.edge!==e&&l.edge!==i).map(l=>l.room_id===t.id&&!l.wall&&l.edge>e?{...l,edge:l.edge-1}:l)}),this._vertex=null}updateFloor(e){this.change((t,n)=>Object.assign(n,e))}updateRoom(e){let t=this._roomId;this.change((n,i)=>Object.assign(i.rooms.find(s=>s.id===t),e))}setArea(e){let t=this.room;if(!t)return;let n=e?this.hass?.areas?.[e]:void 0,i=!t.name||/^(Raum|Room) \d+$/.test(t.name)||Object.values(this.hass?.areas??{}).some(s=>s.name===t.name);this.updateRoom({area_id:e||null,...n&&i?{name:n.name}:{}})}setRect(e,t){let n=this.room;if(!n||!Number.isFinite(t))return;let i=ie(n.points),{x0:s,z0:r,x1:a,z1:l}=i;e==="x"&&([s,a]=[t,t+(a-s)]),e==="z"&&([r,l]=[t,t+(l-r)]),e==="w"&&t>.05&&(a=s+t),e==="d"&&t>.05&&(l=r+t),this.updateRoom({points:[[M(s),M(r)],[M(a),M(r)],[M(a),M(l)],[M(s),M(l)]]})}setPoint(e,t,n){let i=this.room;if(!i||!Number.isFinite(n))return;let s=i.points.map(r=>[...r]);s[e][t]=M(n),this.updateRoom({points:s})}async loadImage(e){this.loadingImages.add(e);try{let t=await en(this.hass,e),n=new Image;n.src=t,await n.decode(),this._images={...this._images,[e]:{url:t,aspect:n.naturalHeight/n.naturalWidth}}}catch{}}async uploadBackground(e){let t=e.target,n=t.files?.[0];if(t.value="",!n)return;let i=await createImageBitmap(n),s=Math.min(1,2048/Math.max(i.width,i.height)),r=document.createElement("canvas");r.width=Math.round(i.width*s),r.height=Math.round(i.height*s),r.getContext("2d").drawImage(i,0,0,r.width,r.height);let a=r.toDataURL("image/jpeg",.85),l=H("img");await wt(this.hass,l,a),this._images={...this._images,[l]:{url:a,aspect:r.height/r.width}};let c=this.floor?.rooms.length?ie(this.floor.rooms.flatMap(d=>d.points)):null;this.updateFloor({background:{image_id:l,x:c?c.x0:0,z:c?c.z0:0,width:c?Math.max(4,M(c.x1-c.x0)):12,opacity:.5}})}render(){let e=this.floor,t=e?fe(e.rooms,{exterior:this._doc.settings.wall_exterior,interior:this._doc.settings.wall_interior},e.walls??[]):null;return v`
      ${this.renderPreview()}
      <div class="fp3d-editor ${this.narrow?"fp3d-narrow":""}">
        <div class="fp3d-main">
          <div class="fp3d-toolbar">
            <div class="fp3d-seg" role="group" aria-label=${this.t("tool_select")}>
              ${["select","rect","polygon","wall","opening","furniture","outdoor","hole","roof","energy"].map(n=>v`<button
                  aria-pressed=${this._tool===n}
                  ?disabled=${!e||!this.isAdmin&&n!=="select"}
                  @click=${()=>{this._tool=n,this._draft=[],this._cursor=null,this._sideOpen=n!=="select"}}
                >
                  ${this.t(`tool_${n}`)}
                </button>`)}
            </div>
            <div class="fp3d-seg">
              <button ?disabled=${!this._canUndo} @click=${()=>this.undo()} title="Ctrl+Z">${this.t("undo")}</button>
              <button ?disabled=${!this._canRedo} @click=${()=>this.redo()} title="Ctrl+Y">${this.t("redo")}</button>
              <button @click=${()=>this.fit()}>${this.t("fit")}</button>
              <button aria-pressed=${this._split} title=${this.t("split_3d_hint")} @click=${()=>this.toggleSplit()}>${this.t("split_3d")}</button>
              ${this.isAdmin?v`<button aria-pressed=${!!this._doc.settings.lock_plan} title=${this.t("lock_plan_hint")} @click=${()=>this.toggleLockPlan()}>${this.t("lock_plan")}</button>`:w}
            </div>
            ${t?.warnings.length?v`<span class="fp3d-warn">${this.t("overlap_warning")}</span>`:w}
          </div>
          <div class="fp3d-stage-pair ${this._split?"fp3d-split":""}" style=${this._split&&!this.narrow?`--fp3d-split:${Math.round(this._splitRatio*100)}%`:""}>
          <div class="fp3d-canvas-wrap">
            ${this.houseTool?v`<div class="fp3d-tool-note">${this.t(this._tool==="energy"?"energy_only_note":"roof_only_note")}</div>`:w}
            <svg
              class="fp3d-plan fp3d-tool-${this._tool}"
              @pointerdown=${this.onPointerDown}
              @pointermove=${this.onPointerMove}
              @pointerup=${this.onPointerUp}
              @pointercancel=${this.onPointerUp}
              @pointerleave=${()=>{this.drag||(this._cursor=null)}}
              @wheel=${this.onWheel}
              @contextmenu=${this.onContextMenu}
            >
              ${this.renderBackground(e)} ${this.renderGrid()} ${this.renderGhost()} ${t?this.renderWalls(t.walls):w}
              ${e?this.renderOutdoor(e):w} ${e?this.renderRooms(e):w} ${e?this.renderFurniture(e):w}
              ${e?this.renderFreeWalls(e):w}
              ${e&&t?this.renderOpenings(e,t.walls):w} ${e?this.renderMeter(e):w}
              ${e&&this._tool==="select"?this.renderDevices(e):w}
              ${this.room&&this.isAdmin&&this._tool==="select"&&!this._openingId&&!this._furnitureId&&!this.isFixedItem("room",this.room.id)?this.renderHandles(this.room):w}
              ${e?this.renderOutdoorHandles(e):w}
              ${this._tool==="roof"?F`${this.renderRoofSections()}${this.renderRoofWindows()}`:this._tool==="energy"?F`${this.renderRoofSections()}${this.renderSolarFields()}${this.renderCables()}${this.renderEnergyMarkers()}`:w} ${this.renderDraft()} ${this.renderGuides()}
            </svg>
            ${this.renderContext()}
            <p class="fp3d-hint ${this._fixedHint?"fp3d-hint-fixed":""}">${e?this._fixedHint?this.t("fixed_drag_hint"):this.t(`hint_${this._tool}`):this.t("hint_empty")}</p>
          </div>
          ${this._split&&!this.narrow?v`<div class="fp3d-split-handle" title=${this.t("split_handle_hint")} @pointerdown=${this.onSplitDown}></div>`:w}
          ${this._split?this.render3d():w}
          </div>
        </div>
        ${this.renderAside(e)}
      </div>
    `}renderBackground(e){let t=e?.background,n=t?this._images[t.image_id]:void 0;if(!t||!n)return w;let[i,s]=this.toScreen([t.x,t.z]),r=t.width*this._view.scale;return F`<image href=${n.url} x=${i} y=${s} width=${r} height=${r*n.aspect} opacity=${t.opacity} preserveAspectRatio="none" pointer-events="none" />`}renderGrid(){let{scale:e}=this._view,{w:t,h:n}=this._size,i=e>=90?.1:e>=30?.5:1,s=e>=20?1:5,[r,a]=this.toWorld(0,0),[l,c]=this.toWorld(t,n),d=[],h=(f,u)=>{for(let y=Math.ceil(r/f)*f;y<=l;y+=f){let b=this.toScreen([y,0])[0];d.push(F`<line class=${u} x1=${b} y1="0" x2=${b} y2=${n} />`)}for(let y=Math.ceil(a/f)*f;y<=c;y+=f){let b=this.toScreen([0,y])[1];d.push(F`<line class=${u} x1="0" y1=${b} x2=${t} y2=${b} />`)}};i<s&&h(i,"fp3d-grid-minor"),h(s,"fp3d-grid-major");let[p,g]=this.toScreen([0,0]);return d.push(F`<circle class="fp3d-origin" cx=${p} cy=${g} r="3" />`),F`<g pointer-events="none">${d}</g>`}renderGhost(){let e=this._doc?.floors.findIndex(n=>n.id===this._floorId)??-1,t=e>0?this._doc.floors[e-1]:void 0;return t?F`<g pointer-events="none">${t.rooms.map(n=>F`<polygon class="fp3d-ghost" points=${n.points.map(i=>this.toScreen(i).join(",")).join(" ")} />`)}</g>`:w}renderWalls(e){let t=this.floor?.height??2.5;return F`<g pointer-events="none">${e.map(n=>{let i=n.height!==void 0&&n.height<t-.01,s=`fp3d-wall${n.exterior?" fp3d-wall-ext":""}${i?" fp3d-wall-low":""}`;return F`<polygon class=${s} points=${n.footprint.map(r=>this.toScreen(r).join(",")).join(" ")} />`})}</g>`}setEdgeHeight(e,t,n){let i=this.floor;if(!i||!this.isAdmin)return;let r=fe(i.rooms,{exterior:this._doc.settings.wall_exterior,interior:this._doc.settings.wall_interior},i.walls??[]).walls.filter(a=>a.sources.some(l=>l.room_id===e.id&&l.edge===t)).flatMap(a=>a.sources);r.some(a=>a.room_id===e.id&&a.edge===t)||r.push({room_id:e.id,edge:t,t0:0,t1:0}),this.change((a,l)=>{for(let c of r){let d=l.rooms.find(p=>p.id===c.room_id);if(!d)continue;let h=(d.wall_heights??[]).slice(0,d.points.length);for(;h.length<d.points.length;)h.push(null);h[c.edge]=n,d.wall_heights=h.every(p=>p===null)?void 0:h}})}renderEdgeHeights(e){let t=this.floor.height,n=e.points.length;return v`<div class="fp3d-edge-box">
      <h4>${this.t("wall_heights")}</h4>
      ${e.points.map((i,s)=>{let r=e.points[(s+1)%n],a=Math.hypot(r[0]-i[0],r[1]-i[1]),l=e.wall_heights?.[s]??null,c=()=>this._edgeHi=s,d=()=>this._edgeHi=null;return v`<div
          class="fp3d-edge-height${s===this._edgeHi?" fp3d-edge-on":""}${l!==null?" fp3d-edge-low":""}"
          @mouseenter=${c}
          @mouseleave=${d}
          @focusin=${c}
          @focusout=${d}
        >
          <span><b>${this.t("wall_n",{a:s+1,b:(s+1)%n+1})}</b><br /><span class="fp3d-muted">${C(this.hass,a,2)} m</span></span>
          ${this.num(this.t("wall_height"),l??t,h=>this.setEdgeHeight(e,s,h>=t-.005?null:Math.max(.05,h)),.05,.05)}
          ${this.isAdmin&&l!==null?v`<button class="fp3d-btn" title=${this.t("wall_height_full")} @click=${()=>this.setEdgeHeight(e,s,null)}>↥</button>`:w}
        </div>`})}
      <p class="fp3d-sub">${this.t("room_wall_hint")}</p>
    </div>`}renderOutdoorHandles(e){let t=this._outdoorId?e.outdoor.find(n=>n.id===this._outdoorId):void 0;return!t||!this.isAdmin||this._tool!=="select"||this._doc.settings.lock_plan?w:F`${t.points.map((n,i)=>{let[s,r]=this.toScreen(n);return F`<g class="fp3d-vertex" data-out-vertex=${`${t.id}:${i}`}><circle cx=${s} cy=${r} r="16" class="fp3d-hit" /><circle cx=${s} cy=${r} r="6" /></g>`})}`}renderOutdoor(e){return F`<g>${e.outdoor.map(t=>{let n=t.points.map(l=>this.toScreen(l).join(",")).join(" "),[i,s]=this.toScreen(le(t.points)),r=ie(t.points),a=Math.min(r.x1-r.x0,r.z1-r.z0)*this._view.scale>40;return F`<g data-outdoor=${t.id} class=${`fp3d-out fp3d-out-${t.type}${t.id===this._outdoorId?" fp3d-out-sel":""}`}>
        <polygon points=${n} />
        ${a?F`<text x=${i} y=${s+4}>${this.t(`out_${t.type}`)}</text>`:w}
      </g>`})}</g>`}renderOutdoorForm(e){let t=this.isAdmin,n=xt(e.points),i=ie(e.points),s=(r,a)=>{let{x0:l,z0:c,x1:d,z1:h}=i;r==="x"&&([l,d]=[a,a+(d-l)]),r==="z"&&([c,h]=[a,a+(h-c)]),r==="w"&&(d=l+Math.max(.1,a)),r==="d"&&(h=c+Math.max(.1,a)),this.updateOutdoor({points:[[l,c],[d,c],[d,h],[l,h]].map(([p,g])=>[M(p),M(g)])})};return v`<section>
      <div class="fp3d-h3row"><h3>${this.t("outdoor")}</h3>${this.fixButton("outdoor",e.id)}</div>
      <div class="fp3d-form">
        <label class="fp3d-field fp3d-wide"
          >${this.t("outdoor_type")}
          <select ?disabled=${!t} @change=${r=>this.updateOutdoor({type:r.target.value})}>
            ${Ci.map(r=>v`<option value=${r} ?selected=${r===e.type}>${this.t(`out_${r}`)}</option>`)}
          </select></label
        >
        ${n?v`${this.num(this.t("x"),i.x0,r=>s("x",r))} ${this.num(this.t("z"),i.z0,r=>s("z",r))}
            ${this.num(this.t("width"),i.x1-i.x0,r=>s("w",r),.01,.1)} ${this.num(this.t("depth"),i.z1-i.z0,r=>s("d",r),.01,.1)}`:w}
      </div>
      <p class="fp3d-sub">${this.t("outdoor_hint")}</p>
      ${t?v`<div class="fp3d-actions">
            <button class="fp3d-btn" @click=${()=>this.duplicateOutdoor()}>${this.t("duplicate")}</button>
            <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteOutdoor()}>${this.t("delete")}</button>
          </div>`:w}
    </section>`}renderRooms(e){return F`
      <g>${e.rooms.map(t=>{let n=t.points.map(i=>this.toScreen(i).join(",")).join(" ");return F`<polygon data-room=${t.id} class=${t.id===this._roomId?"fp3d-room fp3d-room-sel":"fp3d-room"} points=${n} />`})}</g>
      ${this.renderEdgeHighlight()}
      <g pointer-events="none">${e.rooms.map(t=>{let[n,i]=this.toScreen(le(t.points));return F`<text class="fp3d-room-name" x=${n} y=${i-2}>${t.name}</text>
          <text class="fp3d-room-area" x=${n} y=${i+14}>${this.t("area_m2",{a:C(this.hass,Te(t.points),1)})}</text>`})}</g>
    `}renderEdgeHighlight(){let e=this.room,t=this._edgeHi;if(!e||t===null||t>=e.points.length)return w;let[n,i]=this.toScreen(e.points[t]),[s,r]=this.toScreen(e.points[(t+1)%e.points.length]);return F`<line class="fp3d-edge-hi" pointer-events="none" x1=${n} y1=${i} x2=${s} y2=${r} />`}renderMeter(e){let t=this._doc.energy?.meter;if(!t||t.floor_id!==e.id)return w;let[n,i]=this.toScreen([t.x,t.z]);return F`<g class="fp3d-meter" transform="translate(${n} ${i})" pointer-events="none">
      <rect x="-11" y="-11" width="22" height="22" rx="5" />
      <path d="M1.5 -7 L-4 1 H0 L-1.5 7 L4 -1 H0 Z" />
    </g>`}renderFurniture(e){let t=this._view.scale;return F`<g>${e.furniture.map(n=>{let i=n.id===this._furnitureId,[s,r]=this.toScreen([n.x,n.z]),a=Math.min(n.w,n.d)*t>44,l=n.rotation*Math.PI/180,c=n.d/2+Math.max(.3,26/t),[d,h]=this.toScreen([n.x-Math.sin(l)*c,n.z+Math.cos(l)*c]),[p,g]=this.toScreen([n.x-Math.sin(l)*(n.d/2),n.z+Math.cos(l)*(n.d/2)]),f=ue(n.type)&&!!n.entity&&n.entity!=="none"&&this.hass?.states[n.entity]?.state==="on";return F`<g data-furniture=${n.id} class=${`fp3d-furn${i?" fp3d-furn-sel":""}${f?" fp3d-furn-lit":""}${xe.includes(n.type)?" fp3d-energy-item":""}`}>
        <g transform="translate(${s} ${r}) rotate(${n.rotation}) scale(${t})">
          <rect class="fp3d-furn-body" x=${-n.w/2} y=${-n.d/2} width=${n.w} height=${n.d} />
          <g class="fp3d-furn-sym">${ks(n.type,n.w,n.d)}</g>
          <line class="fp3d-furn-front" x1=${-n.w/2} y1=${n.d/2} x2=${n.w/2} y2=${n.d/2} />
        </g>
        ${a?F`<text x=${s} y=${r+4}>${mt(this.hass,n.type)}</text>`:w}
      </g>
      ${i&&this.isAdmin&&!n.locked?[[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,y])=>{let[b,m]=this.toScreen([n.x+u*n.w*Math.cos(l)/2-y*n.d*Math.sin(l)/2,n.z+u*n.w*Math.sin(l)/2+y*n.d*Math.cos(l)/2]);return F`<g class="fp3d-resize" data-resize=${`${n.id}:${u}:${y}`}>
              <circle cx=${b} cy=${m} r="14" class="fp3d-hit" />
              <rect x=${b-5} y=${m-5} width="10" height="10" rx="2" />
            </g>`}):w}
      ${i?(()=>{let[u,y]=this.toScreen([n.x+Math.sin(l)*(n.d/2+18/t),n.z-Math.cos(l)*(n.d/2+18/t)]);return F`<text class="fp3d-dim" x=${u} y=${y+4}>${C(this.hass,n.w,2)} × ${C(this.hass,n.d,2)} m</text>`})():w}
      ${i&&n.locked?F`<text class="fp3d-lock" x=${d} y=${h+5}>🔒</text>`:w}
      ${i&&this.isAdmin&&!n.locked?F`<g class="fp3d-rotate" data-rotate=${n.id}>
            <line x1=${p} y1=${g} x2=${d} y2=${h} />
            <circle cx=${d} cy=${h} r="16" class="fp3d-hit" />
            <circle cx=${d} cy=${h} r="8" />
            <path d="M${d-4} ${h-1}a4 4 0 1 1 2 3.5" />
          </g>`:w}`})}</g>`}renderOpenings(e,t){return F`<g>${e.openings.map(n=>{let i=De(n,e.rooms,e.walls??[]);if(!i)return w;let{room:s,edge:r}=i,a=Pn(t,n,i),l=Oe(s,r,n.offset-n.width/2),c=Oe(s,r,n.offset+n.width/2),d=(c[0]-l[0])/(n.width||1),h=(c[1]-l[1])/(n.width||1),p=Q(s.points)>=0?1:-1,g=[-h*p,d*p],f=[.06,.06];a&&(f=a.wall.free||a.wall.roomLeft===s.id?[a.wall.left,a.wall.right]:[a.wall.right,a.wall.left]);let u=(S,z)=>this.toScreen([S[0]+g[0]*z,S[1]+g[1]*z]),y=[u(l,f[0]+.01),u(c,f[0]+.01),u(c,-f[1]-.01),u(l,-f[1]-.01)],b=n.id===this._openingId,m=mn(n,a?.wall.exterior??!1),_=n.type==="door"&&gn(m),k=`fp3d-open fp3d-open-${n.type}${_?" fp3d-open-front":""}${b?" fp3d-open-sel":""}`,$;if(n.type==="garage"){let S=u(l,f[0]-.04),z=u(c,f[0]-.04),A=u(l,f[0]+Math.min(2,n.height)),I=u(c,f[0]+Math.min(2,n.height));$=F`<line x1=${S[0]} y1=${S[1]} x2=${z[0]} y2=${z[1]} />
          <path class="fp3d-open-track" d="M${S[0]} ${S[1]}L${A[0]} ${A[1]}M${z[0]} ${z[1]}L${I[0]} ${I[1]}" />`}else if(n.type==="door"){let S=n.swing==="out",z=S?-f[1]:f[0],A=n.hinge==="left"==p>0,I=n.leaves===2,x=l,E=c,R=[];if(m==="sidelight"||m==="sidelights"){let L=m==="sidelights",U=Math.min(1.05,Math.max(.6,n.width-.04-(L?.6:.3))),W=(n.width-.04-U)/(L?2:1),K=re=>Oe(s,r,n.offset-n.width/2+re),J=L||!A?.02+W:.02;x=K(J),E=K(J+U),R=L?[[l,K(.02+W)],[K(n.width-.02-W),c]]:A?[[K(n.width-.02-W),c]]:[[l,K(.02+W)]]}let T=[(x[0]+E[0])/2,(x[1]+E[1])/2],P=(I?.5:1)*Math.hypot(E[0]-x[0],E[1]-x[1]),O=(f[0]-f[1])/2,N=R.map(([L,U])=>{let W=u(L,O+.035),K=u(U,O+.035),J=u(L,O-.035),re=u(U,O-.035);return F`<line class="fp3d-open-pane" x1=${W[0]} y1=${W[1]} x2=${K[0]} y2=${K[1]} /><line class="fp3d-open-pane" x1=${J[0]} y1=${J[1]} x2=${re[0]} y2=${re[1]} />`}),B=(L,U)=>{let[W,K]=u(L,z),[J,re]=u(U,z),gt=u(L,z+(S?-P:P)),Yn=P*this._view.scale,fr=(gt[0]-W)*(re-K)-(gt[1]-K)*(J-W);return F`<path d="M${W} ${K}L${gt[0]} ${gt[1]}A${Yn} ${Yn} 0 0 ${fr>0?1:0} ${J} ${re}" />`};$=F`${N}${m==="passage"?F`<line class="fp3d-open-passage" x1=${u(l,O)[0]} y1=${u(l,O)[1]} x2=${u(c,O)[0]} y2=${u(c,O)[1]} />`:m==="sliding"?F`<line x1=${u(x,z)[0]} y1=${u(x,z)[1]} x2=${u(E,z)[0]} y2=${u(E,z)[1]} />`:I?F`${B(x,T)}${B(E,T)}`:B(A?x:E,A?E:x)}`}else{let S=(f[0]-f[1])/2,z=u(l,S+.035),A=u(c,S+.035),I=u(l,S-.035),x=u(c,S-.035),E=[(l[0]+c[0])/2,(l[1]+c[1])/2],R=u(E,f[0]),T=u(E,-f[1]);$=F`<line x1=${z[0]} y1=${z[1]} x2=${A[0]} y2=${A[1]} /><line x1=${I[0]} y1=${I[1]} x2=${x[0]} y2=${x[1]} />${n.leaves===2?F`<line x1=${R[0]} y1=${R[1]} x2=${T[0]} y2=${T[1]} />`:w}`}return F`<g data-opening=${n.id} class=${k}>
        <polygon class="fp3d-open-gap" points=${y.map(S=>S.join(",")).join(" ")} />
        ${$}
      </g>`})}</g>`}renderDevices(e){return F`<g>${e.placements.map(t=>{let n=V(t.entity_id);if(!n)return w;let[i,s]=this.toScreen([t.x,t.z]),r=this.hass?.states[t.entity_id]?.state==="on",a=t.entity_id===this._deviceId,l=`fp3d-device${r?" fp3d-device-on":""}${a?" fp3d-device-sel":""}`;return F`${n==="camera"?this.renderCameraWedge(t,a):w}<g data-device=${t.entity_id} class=${l} transform="translate(${i} ${s})">
        <title>${Z(this.hass,t.entity_id)}</title>
        <circle r="18" class="fp3d-hit" /><circle r="12" />
        <path d=${ft(n)} transform="translate(-7.2 -7.2) scale(0.6)" />
      </g>
      ${a&&t.locked?F`<text class="fp3d-lock" x=${i+16} y=${s-12}>🔒</text>`:w}`})}</g>`}renderCameraWedge(e,t){let n=e.mount==="ceiling",i=e.fov??(n?360:90),s=e.reach??(n?3:4.5),r=(e.rotation??0)*Math.PI/180,a=(_,k)=>this.toScreen([e.x-Math.sin(r+_)*k,e.z+Math.cos(r+_)*k]),[l,c]=this.toScreen([e.x,e.z]),d=Math.min(i,359.9)*Math.PI/180/2,[h,p]=a(-d,s),[g,f]=a(d,s),u=s*this._view.scale,y=i>=360?"":`M${l} ${c}L${h} ${p}A${u} ${u} 0 ${d>Math.PI/2?1:0} 1 ${g} ${f}Z`,[b,m]=a(0,s);return F`<g class="fp3d-wedge ${t?"fp3d-wedge-sel":""}">
      ${i>=360?F`<circle cx=${l} cy=${c} r=${u} />`:F`<path d=${y} />`}
      ${t&&this.isAdmin&&!e.locked?F`<g class="fp3d-rotate" data-aim=${e.entity_id}>
            <line x1=${l} y1=${c} x2=${b} y2=${m} />
            <circle cx=${b} cy=${m} r="16" class="fp3d-hit" />
            <circle cx=${b} cy=${m} r="8" />
            <path d="M${b-4} ${m-1}a4 4 0 1 1 2 3.5" />
          </g>`:w}
    </g>`}renderHandles(e){let t=e.points,n=t.length,i=t.map((r,a)=>{let l=t[(a+1)%n],[c,d]=this.toScreen(r),[h,p]=this.toScreen(l),g=Math.hypot(l[0]-r[0],l[1]-r[1]),f=(c+h)/2,u=(d+p)/2,[y,b]=this.toScreen(le(t)),m=-(p-d),_=h-c,k=Math.hypot(m,_)||1;m/=k,_/=k,m*(f-y)+_*(u-b)<0&&(m=-m,_=-_);let $=Math.hypot(h-c,p-d);return F`
        ${$>50?F`<text class="fp3d-dim" x=${f+m*16} y=${u+_*16+4}>${C(this.hass,g,2)} m</text>`:w}
        ${$>36?F`<g data-mid=${a} class="fp3d-mid"><circle cx=${f} cy=${u} r="14" class="fp3d-hit" /><circle cx=${f} cy=${u} r="6" /><path d="M${f-3} ${u}h6M${f} ${u-3}v6" /></g>`:w}
      `}),s=t.map((r,a)=>{let[l,c]=this.toScreen(r);return F`<g data-vertex=${a} class=${a===this._vertex?"fp3d-vertex fp3d-vertex-sel":"fp3d-vertex"}><circle cx=${l} cy=${c} r="16" class="fp3d-hit" /><circle cx=${l} cy=${c} r="6" /></g>
        <text class="fp3d-vertex-no" x=${l+9} y=${c-9}>${a+1}</text>`});return F`<g>${i}${s}</g>`}renderDraft(){let e=this.drag;if(e?.kind==="freewall"){let[n,i]=this.toScreen(e.start),[s,r]=this.toScreen(e.end),a=Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1]);return F`<g pointer-events="none">
        <line class="fp3d-draft fp3d-draft-wall" x1=${n} y1=${i} x2=${s} y2=${r} />
        <text class="fp3d-dim" x=${(n+s)/2} y=${(i+r)/2-10}>${C(this.hass,a,2)} m</text>
      </g>`}if(e?.kind==="rect"){let[n,i]=this.toScreen(e.start),[s,r]=this.toScreen(e.end),a=Math.abs(e.end[0]-e.start[0]),l=Math.abs(e.end[1]-e.start[1]);return F`<g pointer-events="none">
        <rect class="fp3d-draft" x=${Math.min(n,s)} y=${Math.min(i,r)} width=${Math.abs(s-n)} height=${Math.abs(r-i)} />
        <text class="fp3d-dim" x=${(n+s)/2} y=${Math.min(i,r)-8}>${C(this.hass,a,2)} × ${C(this.hass,l,2)} m</text>
      </g>`}if(this._tool!=="polygon"&&this._tool!=="measure")return w;let t=[...this._draft,...this._cursor?[this._cursor]:[]].map(n=>this.toScreen(n));return F`<g pointer-events="none">
      ${t.length>1?F`<polyline class="fp3d-draft" points=${t.map(n=>n.join(",")).join(" ")} />`:w}
      ${this._tool==="measure"?this._draft.slice(1).map((n,i)=>{let s=this.toScreen(this._draft[i]),r=this.toScreen(n);return F`<text class="fp3d-dim" x=${(s[0]+r[0])/2} y=${(s[1]+r[1])/2-6}>${C(this.hass,Math.hypot(n[0]-this._draft[i][0],n[1]-this._draft[i][1]),2)} m</text>`}):w}
      ${this._draft.map((n,i)=>{let[s,r]=this.toScreen(n);return F`<circle class=${i===0&&this._draft.length>=3?"fp3d-draft-pt fp3d-draft-first":"fp3d-draft-pt"} cx=${s} cy=${r} r=${i===0&&this._draft.length>=3?9:5} />`})}
      ${this._cursor?F`<circle class="fp3d-cursor" cx=${this.toScreen(this._cursor)[0]} cy=${this.toScreen(this._cursor)[1]} r="4" />`:w}
    </g>`}renderGuides(){let e=this._guides,{w:t,h:n}=this._size;return F`<g pointer-events="none">
      ${e.x!==void 0?F`<line class="fp3d-guide" x1=${this.toScreen([e.x,0])[0]} y1="0" x2=${this.toScreen([e.x,0])[0]} y2=${n} />`:w}
      ${e.z!==void 0?F`<line class="fp3d-guide" x1="0" y1=${this.toScreen([0,e.z])[1]} x2=${t} y2=${this.toScreen([0,e.z])[1]} />`:w}
      ${e.point?F`<circle class="fp3d-snap" cx=${this.toScreen(e.point)[0]} cy=${this.toScreen(e.point)[1]} r="9" />`:w}
    </g>`}num(e,t,n,i=.01,s){return v`<label class="fp3d-field"
      >${e}
      <input
        type="number"
        inputmode="decimal"
        step=${i}
        min=${s??w}
        .value=${String(M(t))}
        ?disabled=${!this.isAdmin}
        @change=${r=>{let a=parseFloat(r.target.value.replace(",","."));Number.isFinite(a)&&n(a)}}
    /></label>`}selectFrom3d(e,t){this.selectItem(e,t),this._sideOpen=!1}setSidePinned(e){this._sidePinned=e,this._sideOpen=!1;try{localStorage.setItem("neonplan3d.sidePinned",e?"1":"0")}catch{}}renderAside(e){return this._split&&!this._sidePinned&&!this.narrow?this._sideOpen?v`<aside class="fp3d-side fp3d-side-strip"></aside>
      <aside class="fp3d-side fp3d-side-overlay">
        ${this.renderPinRow(!0)}
        ${this.renderSide(e)}
      </aside>`:v`<aside class="fp3d-side fp3d-side-strip">
        <button class="fp3d-strip-btn" title=${this.t("side_open")} @click=${()=>this._sideOpen=!0}>☰</button>
        ${this._furnitureId||this._deviceId||this._openingId?v`<button class="fp3d-strip-btn fp3d-strip-hot" title=${this.t("side_details")} @click=${()=>this._sideOpen=!0}>⚙</button>`:w}
        <button class="fp3d-strip-btn" title=${this.t("tool_furniture")} @click=${()=>(this._tool="furniture",this._draft=[],this._sideOpen=!0)}>🛋</button>
        <button class="fp3d-strip-btn" title=${this.t("tool_opening")} @click=${()=>(this._tool="opening",this._draft=[],this._sideOpen=!0)}>🚪</button>
      </aside>`:v`<aside class="fp3d-side">${this.renderPinRow()}${this.renderSide(e)}</aside>`}renderPinRow(e=!1){return!this._split||this.narrow?w:v`<div class="fp3d-pin-row">
      ${e?v`<button class="fp3d-btn" @click=${()=>this._sideOpen=!1}>${this.t("side_close")}</button>`:w}
      <button class="fp3d-btn" aria-pressed=${this._sidePinned} title=${this.t("side_pin_hint")} @click=${()=>this.setSidePinned(!this._sidePinned)}>
        📌 ${this.t(this._sidePinned?"side_pinned":"side_pin")}
      </button>
    </div>`}renderSide(e){let t=this._doc?.floors??[],n=this.room,i=this.isAdmin,s=Object.values(this.hass?.areas??{}).sort((a,l)=>a.name.localeCompare(l.name));if(this._tool==="roof")return this.renderRoofPanel();if(this._tool==="energy")return this.renderEnergyPanel();if(this._tool==="furniture"&&e&&i)return v`${this.furnitureItem?this.renderFurnitureForm(this.furnitureItem):w} ${this.renderFurnitureLibrary()}`;let r=this._tool==="measure"?null:this.furnitureItem?this.renderFurnitureForm(this.furnitureItem):this.opening?this.renderOpeningForm(this.opening):this.device?this.renderDeviceForm(this.device):this.outdoorArea?this.renderOutdoorForm(this.outdoorArea):this.freeWall?this.renderFreeWallForm(this.freeWall):null;return r?v`<button class="fp3d-btn fp3d-back" @click=${()=>this.selectItem("room",this._roomId)}>‹ ${this.t(n?"back_to_room":"back_to_floor",{room:n?.name??""})}</button>
        ${r}`:n&&this._tool!=="measure"?v`<button class="fp3d-btn fp3d-back" @click=${()=>this.selectItem("room",null)}>‹ ${this.t("back_to_floor")}</button>
        ${this.renderRoomForm(n,s)} ${this.renderDeviceList(n)}`:v`
      ${i?w:v`<p class="fp3d-note">${this.t("read_only")}</p>`}
      <section>
        <h3>${this.t("floors")}</h3>
        <div class="fp3d-floor-list">
          ${[...t].reverse().map(a=>v`<button
              class="fp3d-chip"
              aria-pressed=${a.id===this._floorId}
              @click=${()=>{this._floorId=a.id,this._roomId=null,this._vertex=null,this._draft=[],this.fit()}}
            >
              ${a.name}
            </button>`)}
          ${i?v`<button
                class="fp3d-btn"
                aria-expanded=${this._floorMenu}
                @click=${()=>this.freeHaFloors.length?this._floorMenu=!this._floorMenu:this.addFloor()}
              >
                + ${this.t("add_floor")}
              </button>`:w}
        </div>
        ${i&&this._floorMenu?v`<div class="fp3d-floor-menu">
              <p class="fp3d-sub">${this.t("floor_from_ha")}</p>
              ${this.freeHaFloors.map(a=>v`<button class="fp3d-btn" @click=${()=>this.addFloor(a)}>
                  ${a.name}${a.level!=null?v` <span class="fp3d-sub">· ${this.t("level",{n:a.level})}</span>`:w}
                </button>`)}
              <button class="fp3d-btn" @click=${()=>this.addFloor()}>${this.t("floor_empty")}</button>
            </div>`:w}
        ${e?v`<div class="fp3d-form">
              <label class="fp3d-field fp3d-wide"
                >${this.t("floor_name")}
                <input .value=${e.name} ?disabled=${!i} @change=${a=>this.updateFloor({name:a.target.value})}
              /></label>
              ${this.num(this.t("elevation"),e.elevation,a=>this.updateFloor({elevation:a}))}
              ${this.num(this.t("height"),e.height,a=>this.updateFloor({height:Math.max(1,a)}),.05,1)}
              ${Object.keys(this.hass?.floors??{}).length?v`<label class="fp3d-field fp3d-wide"
                    >${this.t("ha_floor")}
                    <select ?disabled=${!i} @change=${a=>this.updateFloor({ha_floor:a.target.value||null})}>
                      <option value="" ?selected=${!e.ha_floor}>${this.t("no_ha_floor")}</option>
                      ${Object.values(this.hass?.floors??{}).filter(a=>a.floor_id===e.ha_floor||!t.some(l=>l.ha_floor===a.floor_id)).map(a=>v`<option value=${a.floor_id} ?selected=${a.floor_id===e.ha_floor}>${a.name}</option>`)}
                    </select></label
                  >`:w}
              ${i&&this.unplacedAreas(e).length?v`<div class="fp3d-actions fp3d-wide">
                    <button class="fp3d-btn fp3d-primary" title=${this.t("area_rooms_hint")} @click=${()=>this.addAreaRooms(e)}>
                      ${this.t("area_rooms",{n:this.unplacedAreas(e).length})}
                    </button>
                  </div>`:w}
              ${i?v`<div class="fp3d-actions fp3d-wide">
                    <button class="fp3d-btn" @click=${()=>this.moveFloor(1)}>${this.t("move_up")}</button>
                    <button class="fp3d-btn" @click=${()=>this.moveFloor(-1)}>${this.t("move_down")}</button>
                    <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteFloor()}>${this.t("delete_floor")}</button>
                  </div>
                  <div class="fp3d-actions fp3d-wide">
                    <button class="fp3d-btn" title=${this.t("gaps_hint")} ?disabled=${e.rooms.length<2} @click=${()=>this.closeFloorGaps()}>
                      ${this.t("gaps_close")}
                    </button>
                  </div>
                  ${this._notice?v`<p class="fp3d-sub fp3d-wide fp3d-notice">${this._notice}</p>`:w}`:w}
            </div>`:w}
      </section>
      ${this._tool==="measure"&&e?this.renderMeasureForm():this.freeWall?this.renderFreeWallForm(this.freeWall):this.outdoorArea?this.renderOutdoorForm(this.outdoorArea):this.opening?this.renderOpeningForm(this.opening):this.furnitureItem?this.renderFurnitureForm(this.furnitureItem):this.device?this.renderDeviceForm(this.device):n?v`${this.renderRoomForm(n,s)} ${this.renderDeviceList(n)}`:e?this.renderRoomList(e):w}
      ${i&&!1?this.renderPresenceSettings():w}
      ${e&&i?this.renderBackgroundForm(e):w} ${i?this.renderSettings():w}
      ${i?this.renderBackup():w}
    `}renderRoomList(e){return e.rooms.length?v`<section>
      <h3>${this.t("rooms")}</h3>
      <div class="fp3d-room-list">
        ${e.rooms.map(t=>v`<button class="fp3d-row" @click=${()=>this.selectItem("room",t.id)}>
            <span>${t.name}</span><span class="fp3d-muted">${this.t("area_m2",{a:C(this.hass,Te(t.points),1)})}</span>
          </button>`)}
      </div>
    </section>`:w}renderRoomForm(e,t){let n=this.isAdmin,i=xt(e.points),s=ie(e.points);return v`<section>
      <div class="fp3d-h3row"><h3>${this.t("room")}</h3>${this.fixButton("room",e.id)}</div>
      <div class="fp3d-form">
        <label class="fp3d-field fp3d-wide"
          >${this.t("room_name")}
          <input .value=${e.name} ?disabled=${!n} @change=${r=>this.updateRoom({name:r.target.value})}
        /></label>
        <label class="fp3d-field fp3d-wide"
          >${this.t("area")}
          <select ?disabled=${!n} @change=${r=>this.setArea(r.target.value)}>
            <option value="" ?selected=${!e.area_id}>${this.t("no_area")}</option>
            ${t.map(r=>v`<option value=${r.area_id} ?selected=${r.area_id===e.area_id}>${r.name}</option>`)}
          </select></label
        >
        <label class="fp3d-field fp3d-wide"
          >${this.t("material")}
          <select ?disabled=${!n} @change=${r=>this.updateRoom({floor_material:r.target.value})}>
            ${Ki.map(r=>v`<option value=${r} ?selected=${r===e.floor_material}>${this.t(`mat_${r}`)}</option>`)}
          </select></label
        >
        ${i?v`${this.num(this.t("x"),s.x0,r=>this.setRect("x",r))} ${this.num(this.t("z"),s.z0,r=>this.setRect("z",r))}
            ${this.num(this.t("width"),s.x1-s.x0,r=>this.setRect("w",r),.01,.05)}
            ${this.num(this.t("depth"),s.z1-s.z0,r=>this.setRect("d",r),.01,.05)}`:w}
      </div>
      ${this.renderEdgeHeights(e)} ${this.renderRoomClimate(e)}
      <details class="fp3d-points" ?open=${!i}>
        <summary>${this.t("points")} (${e.points.length})</summary>
        ${e.points.map((r,a)=>v`<div class="fp3d-point ${a===this._vertex?"fp3d-point-sel":""}">
            <span class="fp3d-muted">${a+1}</span>
            ${this.num(this.t("x"),r[0],l=>this.setPoint(a,0,l))} ${this.num(this.t("z"),r[1],l=>this.setPoint(a,1,l))}
            ${n?v`<button class="fp3d-btn" title=${this.t("delete_point")} ?disabled=${e.points.length<=3} @click=${()=>this.deleteVertex(a)}>
                  ×
                </button>`:w}
          </div>`)}
      </details>
      ${n?v`<div class="fp3d-actions">
            <button class="fp3d-btn fp3d-primary" @click=${()=>this._packages=!this._packages}>${this.t("pkg_open")}</button>
            <button class="fp3d-btn" @click=${()=>this.openSpotForm(e)}>${this.t("spots_place")}</button>
            <button class="fp3d-btn" @click=${()=>this.duplicateRoom()}>${this.t("duplicate")}</button>
            <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteRoom()}>${this.t("delete")}</button>
          </div>`:w}
      ${this._spots?this.renderSpotForm(e):w}
      ${this._packages?v`<div class="fp3d-packages">
            ${or.map(r=>v`<button class="fp3d-btn" @click=${()=>this.applyPackage(e,r)}>
                <b>${this.t(`pkg_${r}`)}</b><span>${this.t(`pkg_${r}_desc`)}</span>
              </button>`)}
            <p class="fp3d-sub">${this.t("pkg_hint")}</p>
          </div>`:w}
    </section>`}applyPackage(e,t){if(!this.isAdmin)return;let n=ar(e,t,()=>H("furniture"));this.change((i,s)=>s.furniture.push(...n)),this._packages=!1,this._notice=this.t("pkg_done",{n:n.length})}openSpotForm(e){let t=ie(e.points),n=this.hass?Se(this.hass,e.area_id).filter(i=>i.startsWith("light.")):[];this._spots={type:"lamp_downlight",rows:Math.max(1,Math.round((t.z1-t.z0)/1.2)),cols:Math.max(1,Math.round((t.x1-t.x0)/1.2)),entity:n[0]??null}}placeSpots(e){let t=this._spots;if(!t||!this.isAdmin)return;let[n,i,s]=ae[t.type],r=un(e,t.rows,t.cols).map(([a,l])=>({id:H("furniture"),type:t.type,x:a,z:l,rotation:0,w:n,d:i,h:s,variant:null,entity:t.entity??"none",power:null}));this.change((a,l)=>l.furniture.push(...r)),this._spots=null,this._notice=this.t("spots_placed",{n:r.length})}renderSpotForm(e){let t=this._spots,n=un(e,t.rows,t.cols).length,i=this.entityOptions(r=>/^(light|switch|input_boolean)\./.test(r)),s=r=>this._spots={...t,...r};return v`<div class="fp3d-form fp3d-spot-form">
      <label class="fp3d-field fp3d-wide"
        >${this.t("spots_type")}
        <select @change=${r=>s({type:r.target.value})}>
          ${["lamp_downlight","lamp_spot","lamp_panel","lamp_ceiling"].map(r=>v`<option value=${r} ?selected=${r===t.type}>${this.t(`furn_${r}`)}</option>`)}
        </select></label
      >
      ${this.num(this.t("spots_cols"),t.cols,r=>s({cols:Math.max(1,Math.min(12,Math.round(r)))}),1,1)}
      ${this.num(this.t("spots_rows"),t.rows,r=>s({rows:Math.max(1,Math.min(12,Math.round(r)))}),1,1)}
      ${this.entitySelect(this.t("furn_entity_light"),t.entity,void 0,i,r=>s({entity:r==="none"?null:r}))}
      <div class="fp3d-actions fp3d-wide">
        <button class="fp3d-btn fp3d-primary" ?disabled=${!n} @click=${()=>this.placeSpots(e)}>${this.t("spots_add",{n})}</button>
        <button class="fp3d-btn" @click=${()=>this._spots=null}>${this.t("cancel")}</button>
      </div>
      <p class="fp3d-sub fp3d-wide">${this.t("spots_hint")}</p>
    </div>`}markerSelect(e,t){return v`<label class="fp3d-field fp3d-wide" title=${this.t("marker_show_hint")}
      >${this.t("marker_show")}
      <select ?disabled=${!this.isAdmin} @change=${n=>t(n.target.value||null)}>
        <option value="" ?selected=${!e}>${this.t("marker_show_auto")}</option>
        ${Hi.map(n=>v`<option value=${n} ?selected=${n===e}>${this.t(`marker_show_${n}`)}</option>`)}
      </select></label
    >`}entityOptions(e){let t=n=>{let i=this.hass?.entities?.[n],s=i?.area_id??(i?.device_id?this.hass?.devices?.[i.device_id]?.area_id:null);return s?this.hass?.areas?.[s]?.name:void 0};return Object.keys(this.hass?.states??{}).filter(e).map(n=>({id:n,label:`${Z(this.hass,n)}${t(n)?` \xB7 ${t(n)}`:""}`})).sort((n,i)=>n.label.localeCompare(i.label))}entitySelect(e,t,n,i,s){let r=n===void 0?null:n?this.t("entity_auto",{name:Z(this.hass,n)}):this.t("entity_auto_none"),a=[...r!==null?[{id:"__auto",label:r}]:[],{id:"none",label:this.t("entity_none")}];return v`<label class="fp3d-field fp3d-wide"
      >${e}
      <fp3d-entity-picker
        .options=${i}
        .fixed=${a}
        .value=${t===null?r!==null?"__auto":"none":t}
        .placeholder=${this.t("entity_search")}
        ?disabled=${!this.isAdmin}
        @change=${c=>{c.stopPropagation(),s(c.detail.value==="__auto"?null:c.detail.value)}}
      ></fp3d-entity-picker></label
    >`}openingIsExterior(e){let t=this.floor,n=t?De(e,t.rooms,t.walls??[]):null;if(!t||!n)return!1;let i=fe(t.rooms,{exterior:this._doc.settings.wall_exterior,interior:this._doc.settings.wall_interior},t.walls??[]);return Pn(i.walls,e,n)?.wall.exterior??!1}renderStyleSelect(e){let t=e.type==="door"?pn:fn,n=mn({type:e.type,style:null},this.openingIsExterior(e)),i=e.style&&t.includes(e.style)?e.style:"";return v`<label class="fp3d-field fp3d-wide"
      >${this.t("opening_style")}
      <select ?disabled=${!this.isAdmin} @change=${s=>this.updateOpening({style:s.target.value||null})}>
        <option value="" ?selected=${!i}>${this.t("style_auto",{style:this.t(`style_${n}`)})}</option>
        ${t.map(s=>v`<option value=${s} ?selected=${s===i}>${this.t(`style_${s}`)}</option>`)}
      </select></label
    >`}renderOpeningForm(e){let t=this.isAdmin,n=e.type==="window",i=e.type==="garage",s=u=>{if(!this.hass)return null;let y=structuredClone(this._doc.floors);for(let b of y)for(let m of b.openings)m.id===e.id&&(m[u]=null);return _s(this.hass,y).get(e.id)?.[u]??null},r=u=>this.hass?.states[u]?.attributes.device_class,a=this.entityOptions(u=>u.startsWith("cover.")),l=this.entityOptions(u=>/^(sensor|number|input_number)\./.test(u)&&Number.isFinite(Number(this.hass?.states[u]?.state))),c=this.entityOptions(u=>u.startsWith("binary_sensor.")&&["door","window","opening","garage_door"].includes(r(u)??"")||u.startsWith("sensor.")&&xn(this.hass?.states[u])!==null),d=this.entityOptions(u=>{let y=this.hass?.states[u];return u.startsWith("binary_sensor.")?typeof y?.attributes.window_state=="string":u.startsWith("sensor.")&&(xn(y)!==null||/griff|handle|fenster|window|drehgriff/i.test(`${u} ${Z(this.hass,u)}`))}),h=this.entityOptions(u=>u.startsWith("binary_sensor.")&&["door","window","opening","garage_door"].includes(r(u)??"")),p=u=>{let y=u===1,b=y?e.tilt:e.tilt2??null,m=y?e.contact:e.contact2,_=(y?e.sensor:e.sensor2)??(b&&b!=="none"?"contact_tilt":"contact"),k=$=>this.updateOpening(y?{contact:$}:{contact2:$==="none"?null:$});return v`<label class="fp3d-field fp3d-wide"
          >${this.t("sensor_kind")}
          <select
            ?disabled=${!t}
            @change=${$=>{let S=$.target.value,z=S==="contact_tilt"?{}:y?{tilt:null}:{tilt2:null};this.updateOpening({...y?{sensor:S}:{sensor2:S},...z})}}
          >
            ${["contact","handle","contact_tilt"].map($=>v`<option value=${$} ?selected=${$===_}>${this.t(`sensor_kind_${$}`)}</option>`)}
          </select></label
        >
        ${_==="handle"?this.entitySelect(this.t("handle_entity"),m,void 0,d,$=>k($==="none"?y?"none":null:$)):this.entitySelect(this.t("contact_entity"),m,y?s("contact"):void 0,h,k)}
        ${_==="contact_tilt"?this.entitySelect(this.t("tilt_entity"),b,void 0,c,$=>this.updateOpening(y?{tilt:$==="none"?null:$}:{tilt2:$==="none"?null:$})):w}`},g=_n(e),f=e.type==="door";return v`<section>
      <div class="fp3d-h3row"><h3>${this.t(`preset_${g}`)}</h3>${this.fixButton("opening",e.id)}</div>
      ${t?v`<div class="fp3d-presets" role="group" aria-label=${this.t("opening_type")}>
            ${Object.keys(kt).map(u=>v`<button class="fp3d-chip" aria-pressed=${u===g} @click=${()=>this.setOpeningPreset(e,u)}>${this.t(`preset_${u}`)}</button>`)}
          </div>`:w}
      ${t&&!i?v`<div class="fp3d-actions">
            <button class="fp3d-btn" title=${this.t("flip_hinge_hint")} @click=${()=>this.updateOpening({hinge:e.hinge==="left"?"right":"left"})}>
              ⇆ ${this.t(e.leaves===2?"flip_main_leaf":"flip_hinge")}
            </button>
            ${f?v`<button class="fp3d-btn" title=${this.t("flip_swing_hint")} @click=${()=>this.updateOpening({swing:e.swing==="out"?"in":"out"})}>
                  ⇅ ${this.t("flip_swing")}
                </button>`:w}
          </div>`:w}
      <div class="fp3d-form">
        ${this.num(this.t("width"),e.width,u=>this.updateOpening({width:Math.max(.3,u)}),.01,.3)}
        ${this.num(this.t("opening_position"),e.offset,u=>this.updateOpening({offset:Math.max(0,u)}),.01,0)}
        ${n?this.num(this.t("sill"),e.sill,u=>this.updateOpening({sill:Math.max(0,u)}),.01,0):w}
        ${this.num(this.t("opening_height"),e.height,u=>this.updateOpening({height:Math.max(.3,u)}),.01,.3)}
        ${i?w:this.renderStyleSelect(e)}
        <label class="fp3d-field fp3d-wide" title=${this.t("opening_mark_hint")}
          >${this.t("opening_mark")}
          <select ?disabled=${!this.isAdmin} @change=${u=>this.updateOpening({mark:u.target.value==="closed"?"closed":null})}>
            <option value="" ?selected=${e.mark!=="closed"}>${this.t("opening_mark_open")}</option>
            <option value="closed" ?selected=${e.mark==="closed"}>${this.t("opening_mark_closed")}</option>
          </select></label
        >
        ${i?w:v`<label class="fp3d-field fp3d-wide"
          >${this.t(e.leaves===2?"main_leaf":"hinge")}
          <select ?disabled=${!t} @change=${u=>this.updateOpening({hinge:u.target.value})}>
            <option value="left" ?selected=${e.hinge==="left"}>${this.t("hinge_left")}</option>
            <option value="right" ?selected=${e.hinge==="right"}>${this.t("hinge_right")}</option>
          </select></label
        >`}
        ${n||i?this.entitySelect(this.t("cover_entity"),e.cover,s("cover"),a,u=>this.updateOpening({cover:u})):w}
        ${(n||i)&&e.cover!=="none"?v`${this.entitySelect(this.t("cover_position_entity"),e.position??null,void 0,l,u=>this.updateOpening({position:u==="none"?null:u}))}
              ${e.position?v`<label class="fp3d-check fp3d-wide"
                    ><input
                      type="checkbox"
                      ?disabled=${!t}
                      .checked=${!!e.position_inverted}
                      @change=${u=>this.updateOpening({position_inverted:u.target.checked})}
                    />
                    ${this.t("cover_position_invert")}</label
                  >`:w}
              <label class="fp3d-check fp3d-wide" title=${this.t("cover_confirm_hint")}
                ><input type="checkbox" ?disabled=${!t} .checked=${!!e.confirm} @change=${u=>this.updateOpening({confirm:u.target.checked})} />
                ${this.t("device_confirm")}</label
              >`:w}
        ${n?v`${e.leaves===2?v`<h4 class="fp3d-lib-head fp3d-wide">${this.t("leaf_main")}</h4>`:w}
              ${p(1)} ${e.leaves===2?v`<h4 class="fp3d-lib-head fp3d-wide">${this.t("leaf_second")}</h4>${p(2)}`:w}`:v`${this.entitySelect(this.t(e.leaves===2?"contact_main":"contact_entity"),e.contact,s("contact"),c,u=>this.updateOpening({contact:u}))}
              ${e.leaves===2&&!i?this.entitySelect(this.t("contact_second"),e.contact2,void 0,c,u=>this.updateOpening({contact2:u==="none"?null:u})):w}`}
      </div>
      <p class="fp3d-sub">${this.t(n?"opening_hint":i?"garage_hint":"door_hint")}</p>
      ${t?v`<div class="fp3d-actions"><button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteOpening()}>${this.t("delete")}</button></div>`:w}
    </section>`}renderFurnitureForm(e){let t=this.isAdmin;return v`<section>
      <div class="fp3d-h3row"><h3>${e.name||this.t("furniture")}</h3>${this.fixButton("furniture",e.id)}</div>
      <div class="fp3d-form">
        <label class="fp3d-field fp3d-wide"
          >${this.t("furn_name")}
          <input type="text" maxlength="60" .value=${e.name??""} ?disabled=${!t} placeholder=${this.t(`furn_${e.type}`)===`furn_${e.type}`?"":this.t(`furn_${e.type}`)} @change=${n=>this.updateFurniture({name:n.target.value.trim()||null})} />
        </label>
        <label class="fp3d-field fp3d-wide"
          >${this.t("furniture_type")}
          <select ?disabled=${!t} @change=${n=>this.updateFurniture({type:n.target.value})}>
            ${Zi.map(n=>v`<option value=${n} ?selected=${n===e.type}>${this.t(`furn_${n}`)}</option>`)}
            ${(this.packs??[]).map(n=>v`<optgroup label=${n.name}>
                ${n.items.map(i=>{let s=Ye(n.id,i.id);return v`<option value=${s} ?selected=${s===e.type}>${Re(i,this.hass?.language??"en")}</option>`})}
              </optgroup>`)}
            ${e.type.startsWith("pack:")&&!(this.packs??[]).some(n=>e.type.startsWith(`pack:${n.id}:`))?v`<option value=${e.type} selected>${mt(this.hass,e.type)}</option>`:w}
          </select></label
        >
        ${this.num(this.t("x"),e.x,n=>this.updateFurniture({x:n}))} ${this.num(this.t("z"),e.z,n=>this.updateFurniture({z:n}))}
        ${this.num(this.t("width"),e.w,n=>this.updateFurniture({w:Math.max(.05,n)}),.01,.05)}
        ${this.num(this.t("depth"),e.d,n=>this.updateFurniture({d:Math.max(.05,n)}),.01,.05)}
        ${this.num(this.t("height_m"),e.h,n=>this.updateFurniture({h:Math.max(.005,n)}),.01,0)}
        ${this.num(this.t("rotation"),e.rotation,n=>this.updateFurniture({rotation:(n%360+360)%360}),1)}
        ${hn(e)&&this.floor?v`${this.num(this.t("mount_height"),e.mount_y??an(this.floor,e),n=>this.updateFurniture({mount_y:Math.max(0,n)}),.01,0)}
              ${e.mount_y!=null?v`<button class="fp3d-btn fp3d-field-btn" ?disabled=${!t} @click=${()=>this.updateFurniture({mount_y:null})}>${this.t("height_auto")}</button>`:w}`:w}
      </div>
      ${e.type==="stairs"?v`<p class="fp3d-sub">${this.t("stairs_hint")}</p>`:w}
      ${e.type==="stairwell"?v`<p class="fp3d-sub">${this.t("stairwell_hint")}</p>
            ${this.floor&&!this.floor.rooms.some(n=>n.points.length>=3&&Ms(bn(e),n.points))?v`<p class="fp3d-sub fp3d-pack-error">${this.t("stairwell_outside")}</p>`:w}`:w}
      ${e.type==="inverter"||e.type==="home_battery"?v`<div class="fp3d-form">
            <label class="fp3d-field fp3d-wide"
              >${this.t("furn_model")}
              <select ?disabled=${!t} @change=${n=>this.updateFurniture({variant:n.target.value||null})}>
                ${(e.type==="inverter"?["","slim","hybrid"]:["","wall","cube"]).map(n=>v`<option value=${n} ?selected=${(e.variant??"")===n}>${this.t(`${e.type==="inverter"?"inverter":"battery"}_${n||"std"}`)}</option>`)}
              </select></label
            >
          </div>`:w}
      ${e.type==="lamp_pendant"?v`<div class="fp3d-form">
            <label class="fp3d-field fp3d-wide"
              >${this.t("pendant_shape")}
              <select ?disabled=${!t} @change=${n=>this.updateFurniture({variant:n.target.value||null})}>
                ${["","globe","cone","drum"].map(n=>v`<option value=${n} ?selected=${(e.variant??"")===n}>${this.t(`pendant_${n||"shade"}`)}</option>`)}
              </select></label
            >
          </div>`:w}
      ${on(e.type)?this.renderFurnitureLinks(e):w} ${e.type==="parking"?this.renderParkingForm(e):w}
      ${t?v`<div class="fp3d-actions">
            <button class="fp3d-btn" @click=${()=>this.rotateFurniture(-90)}>${this.t("rotate_left")}</button>
            <button class="fp3d-btn" @click=${()=>this.rotateFurniture(90)}>${this.t("rotate_right")}</button>
            <button class="fp3d-btn" @click=${()=>this.duplicateFurniture()}>${this.t("duplicate")}</button>
            <button class="fp3d-btn fp3d-danger" @click=${()=>this.deleteFurniture()}>${this.t("delete")}</button>
          </div>`:w}
    </section>`}setEnergy(e){let t=structuredClone(this._doc);t.energy={...t.energy,...e},this.setDoc(t)}async importEnergyPrefs(){if(!this.hass)return;let e;try{e=await this.hass.callWS({type:"energy/get_prefs"})}catch{this._energyNote=this.t("energy_import_failed");return}let t=er(this.hass,e),n=this._doc.energy,i=Object.fromEntries(Object.entries(t).filter(([r])=>n[r]==null)),s=Object.keys(i).length;s&&this.setEnergy(i),this._energyNote=s?this.t("energy_import_done",{n:s}):this.t("energy_import_none")}renderEnergyBalance(){let e=this._doc.energy,t=this.isAdmin,n=(c,d)=>this.hass?.states[c]?.attributes[d],i=this.entityOptions(c=>c.startsWith("sensor.")&&n(c,"device_class")==="power"),s=this.entityOptions(c=>c.startsWith("sensor.")&&n(c,"device_class")==="battery"),r=this.entityOptions(c=>c.startsWith("sensor.")&&(n(c,"device_class")==="monetary"||/\/(kWh|MWh)$/.test(n(c,"unit_of_measurement")??""))),a=c=>d=>this.setEnergy({[c]:d==="none"?null:d}),l=Qs(this._doc);return v`<section>
      <h3>⚖ ${this.t("energy_balance")}</h3>
      <p class="fp3d-sub">${this.t("energy_balance_hint")}</p>
      <div class="fp3d-form">
        ${this.entitySelect(this.t("energy_grid"),e.grid,l.grid,i,a("grid"))}
        <label class="fp3d-check fp3d-wide"
          ><input type="checkbox" .checked=${e.grid_invert} ?disabled=${!t} @change=${c=>this.setEnergy({grid_invert:c.target.checked})} />
          ${this.t("energy_invert")}</label
        >
        ${this.entitySelect(this.t("energy_solar_sensor"),e.solar,l.solar[0]??null,i,a("solar"))}
        ${this.entitySelect(this.t("energy_battery_sensor"),e.battery,l.battery[0]??null,i,a("battery"))}
        <label class="fp3d-check fp3d-wide"
          ><input type="checkbox" .checked=${e.battery_invert} ?disabled=${!t} @change=${c=>this.setEnergy({battery_invert:c.target.checked})} />
          ${this.t("energy_invert")}</label
        >
        ${this.entitySelect(this.t("energy_battery_soc"),e.battery_soc,l.soc[0]??null,s,a("battery_soc"))}
        ${this.entitySelect(this.t("energy_consumption_sensor"),e.consumption,null,i,a("consumption"))}
        ${this.entitySelect(this.t("energy_tariff_sensor"),e.tariff,void 0,r,a("tariff"))}
      </div>
      <div class="fp3d-actions">
        <button class="fp3d-btn" ?disabled=${!t||!this.hass} @click=${()=>this.importEnergyPrefs()}>${this.t("energy_import_prefs")}</button>
      </div>
      ${this._energyNote?v`<p class="fp3d-sub">${this._energyNote}</p>`:w}
      <p class="fp3d-sub">${this.t("energy_hint")}</p>
    </section>`}renderPresenceSettings(){let e=Object.keys(this.hass?.states??{}).filter(i=>i.startsWith("person.")).sort(),t=i=>{let s=i.slice(7),r=this.entityOptions(l=>l.startsWith("sensor.")),a=l=>l.includes(s)&&/(area|room|raum|bermuda|espresense)/.test(l);return[...r.filter(l=>a(l.id)),...r.filter(l=>!a(l.id))]},n=(i,s)=>{let r=structuredClone(this._doc);r.presence=r.presence.filter(a=>a.person!==i),s&&s!=="none"&&r.presence.push({person:i,sensor:s}),this.setDoc(r)};return v`<details class="fp3d-section">
      <summary>${this.t("presence")}</summary>
      <div class="fp3d-form">
        ${e.length?e.map(i=>this.entitySelect(`${Z(this.hass,i)} \xB7 ${this.t("presence_sensor")}`,this._doc.presence.find(s=>s.person===i)?.sensor??null,void 0,t(i),s=>n(i,s))):v`<p class="fp3d-sub fp3d-wide">${this.t("no_persons")}</p>`}
      </div>
      <p class="fp3d-sub">${this.t("presence_hint")}</p>
    </details>`}renderFurnitureLinks(e){if(!this.hass)return w;let t=this.hass,n=c=>{let d=structuredClone(this._doc.floors);for(let h of d)for(let p of h.furniture)p.id===e.id&&(p[c]=null);return zn(t,d).get(e.id)?.[c]??null},i=zt(e.type),s=ue(e.type),r=this.entityOptions(c=>s?/^(light|switch|input_boolean)\./.test(c):i?/^(media_player|switch|input_boolean|light)\./.test(c):e.type==="radiator"?c.startsWith("climate."):e.type==="robot_vacuum"?c.startsWith("vacuum."):/^(switch|media_player|fan|input_boolean|climate)\./.test(c)||ms(t.states[c])),a=this.entityOptions(c=>c.startsWith("sensor.")&&t.states[c]?.attributes.device_class==="power"),l=e.type==="fridge_smart"?this.entityOptions(c=>c.startsWith("binary_sensor.")):[];return v`<div class="fp3d-form fp3d-links">
        ${e.type==="grid_point"?v`<p class="fp3d-sub fp3d-wide">${this.t("grid_point_hint")}</p>`:this.entitySelect(this.t(s?"furn_entity_light":i?"furn_entity_tv":e.type==="radiator"?"furn_entity_climate":e.type==="robot_vacuum"?"furn_entity_vacuum":"furn_entity"),e.entity??null,n("entity"),r,c=>this.updateFurniture({entity:c}))}
        ${s||e.type==="grid_point"?w:this.entitySelect(this.t(e.type==="meter"?"energy_grid":e.type==="inverter"?"energy_solar_sensor":e.type==="home_battery"?"energy_battery_sensor":"furn_power"),e.power??null,n("power"),a,c=>this.updateFurniture({power:c}))}
      </div>
      ${e.type==="home_battery"?v`<div class="fp3d-form fp3d-links">
            ${this.entitySelect(this.t("furn_soc"),e.soc??null,void 0,this.entityOptions(c=>c.startsWith("sensor.")&&(t.states[c]?.attributes.device_class==="battery"||t.states[c]?.attributes.unit_of_measurement==="%")),c=>this.updateFurniture({soc:c==="none"?null:c}))}
          </div>`:w}
      ${e.type==="wallbox"?v`<div class="fp3d-form fp3d-links">
            ${this.entitySelect(this.t("furn_wallbox_status"),e.status??null,void 0,this.entityOptions(c=>c.startsWith("binary_sensor.")||c.startsWith("sensor.")),c=>this.updateFurniture({status:c==="none"?null:c}))}
          </div>`:w}
      ${!s||e.entity?v`<label class="fp3d-check fp3d-wide" title=${this.t("device_confirm_hint")}
            ><input type="checkbox" .checked=${!!e.confirm} ?disabled=${!this.isAdmin} @change=${c=>this.updateFurniture({confirm:c.target.checked})} />
            ${this.t("device_confirm")}</label
          >
          <div class="fp3d-form">${this.markerSelect(e.marker??null,c=>this.updateFurniture({marker:c}))}</div>`:w}
      ${e.type==="robot_vacuum"?v`<div class="fp3d-form fp3d-links">
            ${this.entitySelect(this.t("furn_robot_room"),e.room_sensor??null,ys(t,zn(t,this._doc.floors).get(e.id)?.entity??null,null),this.entityOptions(c=>c.startsWith("sensor.")),c=>this.updateFurniture({room_sensor:c}))}
          </div>`:w}
      ${e.type==="fridge_smart"?v`<div class="fp3d-form fp3d-links">
              ${this.entitySelect(this.t("furn_door_left"),e.door_left??null,void 0,l,c=>this.updateFurniture({door_left:c}))}
              ${this.entitySelect(this.t("furn_door_right"),e.door_right??null,void 0,l,c=>this.updateFurniture({door_right:c}))}
            </div>
            <p class="fp3d-sub">${this.t("fridge_hint")}</p>`:w}
      ${vs(e.type)?this.renderPictureRules(e):w}
      <p class="fp3d-sub">${this.t(s?e.type==="lamp_pendant"?"lamp_hint_pendant":"lamp_hint":i?"furn_links_hint_tv":e.type==="robot_vacuum"?"robot_hint":"furn_links_hint")}</p>`}renderParkingForm(e){let t=this.isAdmin,n=this.hass?.language??"en",i=(this.packs??[]).flatMap(b=>b.items.filter(m=>m.vehicle).map(m=>({id:Ye(b.id,m.id),label:`${Re(m,n)} \xB7 ${b.name}`}))),s=this.entityOptions(b=>/^(binary_sensor|device_tracker|input_boolean|switch|sensor)\./.test(b)),r=this.entityOptions(b=>/^(sensor|input_select|select|input_text)\./.test(b)),a=e.type_entity?this.hass?.states[e.type_entity]:void 0,l=Array.isArray(a?.attributes.options)?a.attributes.options:[],c=e.types??[],d=b=>this.updateFurniture({types:b}),h=(b,m)=>v`<select ?disabled=${!t} @change=${_=>m(_.target.value||null)}>
        <option value="" ?selected=${!b}>${this.t("parking_vehicle_none")}</option>
        ${i.map(_=>v`<option value=${_.id} ?selected=${_.id===b}>${_.label}</option>`)}
      </select>`,p=this.floor,g=p?.rooms.find(b=>b.points.length>=3&&D([e.x,e.z],b.points)),f=e.vehicle?ee(e.vehicle):void 0,u=f?f.size[2]*(e.scale??1):0,y=!!g&&!!p&&u>p.height+1e-6;return v`<div class="fp3d-form fp3d-links">
        ${this.entitySelect(this.t("parking_entity"),e.entity??null,void 0,s,b=>this.updateFurniture({entity:b==="none"?null:b}))}
        <label class="fp3d-field fp3d-wide">${this.t("parking_vehicle")} ${h(e.vehicle??null,b=>this.updateFurniture({vehicle:b}))}</label>
        ${i.length?w:v`<p class="fp3d-sub fp3d-wide">${this.t("parking_no_pack")}</p>`}
        ${this.num(this.t("parking_scale"),Math.round((e.scale??1)*100),b=>this.updateFurniture({scale:Math.min(150,Math.max(30,b))/100}),5,30)}
        ${this.entitySelect(this.t("parking_type_entity"),e.type_entity??null,void 0,r,b=>this.updateFurniture({type_entity:b==="none"?null:b}))}
        ${e.type_entity?v`<div class="fp3d-wide">
              <div class="fp3d-sub">${this.t("parking_types")}</div>
              ${c.map((b,m)=>v`<div class="fp3d-parking-row">
                  <input
                    type="text"
                    list="fp3d-parking-states"
                    placeholder=${this.t("parking_type_state")}
                    .value=${b.state}
                    ?disabled=${!t}
                    @change=${_=>d(c.map((k,$)=>$===m?{...k,state:_.target.value}:k))}
                  />
                  ${h(b.vehicle,_=>d(c.map((k,$)=>$===m?{...k,vehicle:_??""}:k)))}
                  <button class="fp3d-btn" ?disabled=${!t} title=${this.t("delete")} @click=${()=>d(c.filter((_,k)=>k!==m))}>✕</button>
                </div>`)}
              <datalist id="fp3d-parking-states">${l.map(b=>v`<option value=${b}></option>`)}</datalist>
              ${t?v`<button class="fp3d-btn" @click=${()=>d([...c,{state:l[c.length]??"",vehicle:i[0]?.id??""}])}>${this.t("parking_add_type")}</button>`:w}
            </div>`:w}
      </div>
      ${y?v`<p class="fp3d-sub fp3d-warn">${this.t("parking_too_tall",{car:C(this.hass,u,2),room:C(this.hass,p.height,2)})}</p>`:w}
      <p class="fp3d-sub">${this.t("parking_hint")}</p>`}toggleLibrary(e){let t=new Set(this._libOpen);t.has(e)?t.delete(e):t.add(e),this._libOpen=t;try{localStorage.setItem("neonplan3d.library",JSON.stringify([...t]))}catch{}}librarySection(e,t,n,i){let s=i?n.filter(a=>a.label.toLowerCase().includes(i)):n;if(i&&!s.length)return w;let r=i?!0:this._libOpen.has(e);return v`<button class="fp3d-lib-head fp3d-lib-toggle" aria-expanded=${r} @click=${()=>this.toggleLibrary(e)}>
        <span class="fp3d-lib-caret">${r?"\u25BE":"\u25B8"}</span>${t} <span class="fp3d-lib-count">${s.length}</span>
      </button>
      ${r?v`<div class="fp3d-library">${s.map(a=>this.libraryButton(a.type,a.label))}</div>`:w}`}storedPictures(){let e=[];for(let t of this._doc.floors)for(let n of t.furniture)for(let i of n.pictures??[])i.image&&!/^https?:\/\//.test(i.image)&&!i.image.startsWith("camera:")&&!e.includes(i.image)&&e.push(i.image);return e}renderPictureRules(e){let t=this.isAdmin,n=e.pictures??[];if(!st("screens"))return v`<div class="fp3d-wide">
        <div class="fp3d-sub">${this.t("screen_pictures")}</div>
        <p class="fp3d-sub">🔒 ${this.t("pro_feature_screens")} – ${this.t("pro_locked")} <a href=${nt(this.hass?.language)} target="_blank" rel="noopener">${this.t("pro_shop")}</a> · <a href=${it(this.hass?.language,"screens")} target="_blank" rel="noopener">${this.t("manual_more")}</a></p>
      </div>`;let i=b=>this.updateFurniture({pictures:b}),s=this.entityOptions(()=>!0),r=b=>["string","number","boolean"].includes(typeof b),a=b=>Object.entries(this.hass?.states[b]?.attributes??{}).filter(([m,_])=>r(_)&&m!=="friendly_name"&&m!=="icon").map(([m])=>m),l=(b,m)=>{let _=this.hass?.states[b];return _?String((m?_.attributes[m]:_.state)??""):""},c=(b,m)=>{let _=this.hass?.states[b],k=!m&&Array.isArray(_?.attributes.options)?_.attributes.options:[];return k.length?k:[l(b,m)]},d=b=>`${b.entity}\0${b.attribute??""}`,h=[];n.forEach((b,m)=>{let _=h.find(k=>d(k)===d(b));_?_.rows.push(m):h.push({entity:b.entity,attribute:b.attribute??null,rows:[m]})});let p=(b,m)=>i(n.map((_,k)=>b.rows.includes(k)?{..._,...m}:_)),g=(b,m)=>i(n.map((_,k)=>k===b?{..._,...m}:_)),f=this.storedPictures(),u=this.entityOptions(b=>b.startsWith("camera.")),y=b=>b.image.startsWith("camera:")?b.image.slice(7):null;return v`<div class="fp3d-wide">
      <div class="fp3d-sub">${this.t("screen_pictures")}</div>
      ${n.length?v`<label class="fp3d-field fp3d-wide"
            >${this.t("screen_bg")}
            <select ?disabled=${!t} @change=${b=>this.updateFurniture({screen_bg:b.target.value})}>
              <option value="black" ?selected=${(e.screen_bg??"black")==="black"}>${this.t("screen_bg_black")}</option>
              <option value="white" ?selected=${e.screen_bg==="white"}>${this.t("screen_bg_white")}</option>
            </select></label
          >`:w}
      ${h.map(b=>v`<div class="fp3d-picture-group">
          <fp3d-entity-picker
            .options=${s}
            .value=${b.entity}
            .placeholder=${this.t("entity_search")}
            ?disabled=${!t}
            @change=${m=>{m.stopPropagation(),p(b,{entity:m.detail.value})}}
          ></fp3d-entity-picker>
          <select
            ?disabled=${!t}
            title=${this.t("picture_attribute")}
            @change=${m=>{let _=m.target.value||null,k=l(b.entity,_);i(n.map(($,S)=>b.rows.includes(S)?{...$,attribute:_,state:b.rows[0]===S?k:$.state}:$))}}
          >
            <option value="" ?selected=${!b.attribute}>${this.t("picture_state_of")}</option>
            ${a(b.entity).map(m=>v`<option value=${m} ?selected=${m===b.attribute}>${m}</option>`)}
          </select>
          <span class="fp3d-sub fp3d-rule-now">${this.t("picture_current",{value:l(b.entity,b.attribute)||"\u2013"})}</span>
          ${b.rows.map(m=>{let _=n[m],k=!!this.hass&&bs(this.hass,_);return v`<div class="fp3d-picture-row ${k?"fp3d-rule-hit":""}">
              <input
                type="text"
                list="fp3d-picture-states-${m}"
                placeholder=${this.t("picture_state")}
                .value=${_.state}
                ?disabled=${!t}
                @change=${$=>g(m,{state:$.target.value})}
              />
              <datalist id="fp3d-picture-states-${m}"><option value="*"></option>${c(b.entity,b.attribute).map($=>v`<option value=${$}></option>`)}</datalist>
              ${this._images[_.image]?v`<img class="fp3d-picture-thumb" src=${this._images[_.image].url} alt="" /> `:w}
              ${y(_)&&this.hass?.states[y(_)]?.attributes.entity_picture?v`<img class="fp3d-picture-thumb" src=${String(this.hass.states[y(_)].attributes.entity_picture)} alt="" />`:w}
              <label class="fp3d-btn fp3d-picture-pick">
                ${_.image?this.t("picture_change"):this.t("picture_pick")}
                <input type="file" accept="image/*" hidden ?disabled=${!t} @change=${$=>{this.uploadPicture($,e,m)}} />
              </label>
              ${f.filter($=>$!==_.image).length?v`<div class="fp3d-picture-reuse" title=${this.t("picture_reuse")}>
                    ${f.filter($=>$!==_.image&&this._images[$]).map($=>v`<button class="fp3d-picture-reuse-btn" ?disabled=${!t} @click=${()=>g(m,{image:$})}><img src=${this._images[$].url} alt="" /></button>`)}
                  </div>`:w}
              <input
                type="url"
                placeholder=${this.t("picture_url")}
                .value=${/^https?:\/\//.test(_.image)?_.image:""}
                ?disabled=${!t}
                @change=${$=>{let S=$.target.value.trim();S&&g(m,{image:S})}}
              />
              ${u.length?v`<fp3d-entity-picker
                    class="fp3d-picture-camera"
                    .options=${u}
                    .fixed=${[{id:"none",label:this.t("picture_camera_none")}]}
                    .value=${y(_)??"none"}
                    .placeholder=${this.t("picture_camera")}
                    ?disabled=${!t}
                    @change=${$=>{$.stopPropagation(),$.detail.value!=="none"?g(m,{image:`camera:${$.detail.value}`}):y(_)&&g(m,{image:""})}}
                  ></fp3d-entity-picker>`:w}
              <span class="fp3d-sub">${k?this.t("picture_matches"):""}</span>
              <button class="fp3d-btn" ?disabled=${!t} title=${this.t("delete")} @click=${()=>i(n.filter(($,S)=>S!==m))}>✕</button>
            </div>`})}
          ${t?v`<button class="fp3d-btn" @click=${()=>i([...n,{entity:b.entity,attribute:b.attribute,state:l(b.entity,b.attribute),image:""}])}>
                ${this.t("picture_add_value")}
              </button>`:w}
        </div>`)}
      ${t?v`<button class="fp3d-btn" @click=${()=>i([...n,{entity:s[0]?.id??"",attribute:null,state:"on",image:""}])}>${this.t("picture_add_entity")}</button>`:w}
      <p class="fp3d-sub">${this.t("screen_pictures_hint")}</p>
    </div>`}async uploadPicture(e,t,n){let i=e.target,s=i.files?.[0];if(i.value="",!s)return;let r=await createImageBitmap(s),a=Math.min(1,512/Math.max(r.width,r.height)),l=document.createElement("canvas");l.width=Math.round(r.width*a),l.height=Math.round(r.height*a),l.getContext("2d").drawImage(r,0,0,l.width,l.height);let c=l.toDataURL(s.type==="image/png"?"image/png":"image/jpeg",.85),d=H("pic");await wt(this.hass,d,c),this._images={...this._images,[d]:{url:c,aspect:l.height/l.width}};let h=this.furnitureItem?.id===t.id?this.furnitureItem.pictures??[]:t.pictures??[];this.updateFurniture({pictures:h.map((p,g)=>g===n?{...p,image:d}:p)})}renderFurnitureLibrary(){let e=this.room,t=this._furnQuery.trim().toLowerCase(),n=this.hass?.language??"en";return v`<section>
      <h3>${this.t("furniture_add")}</h3>
      <p class="fp3d-sub">${e?this.t("furniture_into",{room:e.name}):this.t("furniture_pick_room")}</p>
      <input
        class="fp3d-search"
        type="search"
        placeholder=${this.t("furniture_search")}
        .value=${this._furnQuery}
        @input=${i=>this._furnQuery=i.target.value}
      />
      ${Object.entries(Yi).map(([i,s])=>this.librarySection(`group:${i}`,this.t(`furn_group_${i}`),[...s,...i==="kitchen"&&st("fridge_smart")?["fridge_smart"]:[]].map(r=>({type:r,label:this.t(`furn_${r}`)})),t))}
      ${(this.packs??[]).map(i=>this.librarySection(`pack:${i.id}`,i.name,i.items.map(s=>({type:Ye(i.id,s.id),label:Re(s,n)})),t))}
    </section>
    <div class="fp3d-ext-teaser">
      <b>${this.t("ext_teaser_title")}</b>
      <span class="fp3d-sub">${this.t("ext_teaser_text")}</span>
      <button class="fp3d-btn fp3d-primary" @click=${()=>this.dispatchEvent(new CustomEvent("open-extensions",{bubbles:!0,composed:!0}))}>${this.t("ext_open")}</button>
    </div>`}libraryButton(e,t){let n=s=>{this.showPreview(e,s.currentTarget)},i=ue(e)?"light":on(e)?"switch":null;return v`<button
      class="fp3d-btn ${i?"fp3d-lib-electric":""}"
      title=${i?this.t(i==="light"?"lib_badge_light":"lib_badge_electric"):t}
      @click=${()=>this.addFurniture(e)}
      @mouseenter=${n}
      @focus=${n}
      @mouseleave=${()=>this._preview=null}
      @blur=${()=>this._preview=null}
    >
      ${t}
      ${i?v`<svg class="fp3d-lib-badge" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d=${ft(i)} />
          </svg>`:w}
    </button>`}async showPreview(e,t){let n=t.getBoundingClientRect(),i={left:Math.max(8,n.left-196),top:Math.max(8,Math.min(window.innerHeight-200,n.top+n.height/2-95))};this._preview={type:e,url:null,...i};try{let s=await dr(),[r,a,l]=Je(e),c=s.furniturePreview({type:e,w:r,d:a,h:l,variant:null,lamp:Qi[e]??null},180,this.packs??[]);this._preview?.type===e&&(this._preview={type:e,url:c,...i})}catch{this._preview=null}}renderPreview(){let e=this._preview;return e?v`<div class="fp3d-preview" style="left:${e.left}px;top:${e.top}px" aria-hidden="true">
      ${e.url?v`<img src=${e.url} alt="" />`:v`<span class="fp3d-preview-wait"></span>`}
      <b>${mt(this.hass,e.type)}</b>
    </div>`:w}renderDeviceForm(e){let t=this.isAdmin,n=V(e.entity_id),i=n==="light",s=e.mount??"ceiling",r=n?$n(n,this.floor?.height??2.5,i?s:null):1;return v`<section>
      <div class="fp3d-h3row"><h3>${this.t("device")}</h3>${this.fixButton("device",e.entity_id)}</div>
      <p class="fp3d-dev-title">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d=${n?ft(n):""} />
        </svg>
        ${Z(this.hass,e.entity_id)}
      </p>
      <div class="fp3d-form">
        ${i?v`<label class="fp3d-field fp3d-wide"
              >${this.t("lamp_mount")}
              <select ?disabled=${!t} @change=${a=>this.updateDevice({mount:a.target.value,y:null})}>
                ${["ceiling","floor","table","wall"].map(a=>v`<option value=${a} ?selected=${a===s}>${this.t(`lamp_${a}`)}</option>`)}
              </select></label
            >`:n==="camera"?v`<label class="fp3d-field fp3d-wide"
                >${this.t("camera_mount")}
                <select ?disabled=${!t} @change=${a=>this.updateDevice({mount:a.target.value,y:null})}>
                  <option value="wall" ?selected=${(e.mount??"wall")==="wall"}>${this.t("camera_mount_wall")}</option>
                  <option value="ceiling" ?selected=${e.mount==="ceiling"}>${this.t("camera_mount_ceiling")}</option>
                </select></label
              >`:w}
        ${this.num(this.t("x"),e.x,a=>this.updateDevice({x:a}))} ${this.num(this.t("z"),e.z,a=>this.updateDevice({z:a}))}
        ${this.num(this.t("marker_height"),e.y??r,a=>this.updateDevice({y:Math.max(0,a)}),.05,0)}
        ${this.num(this.t("rotation"),e.rotation??0,a=>this.updateDevice({rotation:(a%360+360)%360}),1)}
        ${n==="camera"?v`${this.num(this.t("camera_fov"),e.fov??(e.mount==="ceiling"?360:90),a=>this.updateDevice({fov:Math.min(360,Math.max(10,a))}),5,10)}
            ${this.num(this.t("camera_reach"),e.reach??(e.mount==="ceiling"?3:4.5),a=>this.updateDevice({reach:Math.min(50,Math.max(.5,a))}),.5,.5)}
            ${this.num(this.t("camera_tilt"),e.tilt??(e.mount==="ceiling"?65:20),a=>this.updateDevice({tilt:Math.min(90,Math.max(0,a))}),5,0)}
            <p class="fp3d-sub fp3d-wide">${this.t("camera_aim_hint")}</p>`:w}
        ${n&&ls.has(n)?v`<label class="fp3d-check fp3d-wide" title=${this.t("device_confirm_hint")}
              ><input type="checkbox" .checked=${!!e.confirm} ?disabled=${!t} @change=${a=>this.updateDevice({confirm:a.target.checked})} />
              ${this.t("device_confirm")}</label
            >`:w}
        ${this.markerSelect(e.marker??null,a=>this.updateDevice({marker:a}))}
      </div>
      ${t?v`<div class="fp3d-actions">
            <button class="fp3d-btn" @click=${()=>this.centreDevice()}>${this.t("device_centre")}</button>
            ${e.y!==null?v`<button class="fp3d-btn" @click=${()=>this.updateDevice({y:null})}>${this.t("height_auto")}</button>`:w}
            <button
              class="fp3d-btn fp3d-danger"
              @click=${()=>{this.removeDevice(e.entity_id),this._deviceId=null}}
            >
              ${this.t("devices_remove")}
            </button>
          </div>`:w}
    </section>`}renderDeviceList(e){let t=this.isAdmin,n=this.hass,i=e.area_id?n?.areas?.[e.area_id]?.name:void 0,s=n?Se(n,e.area_id).filter(_=>et(V(_))):[],r=new Set([...this.floor?.placements.filter(_=>D([_.x,_.z],e.points)).map(_=>_.entity_id)??[],...this.floor?.furniture.filter(_=>ue(_.type)&&_.entity&&D([_.x,_.z],e.points)).map(_=>_.entity)??[]]),a=n?Sn(n,s):[],l=a.map(_=>_.primary).filter(_=>!r.has(_)),c=this._deviceQuery.trim().toLowerCase(),d=_=>!c||Z(n,_,i).toLowerCase().includes(c)||_.includes(c),h=this.floor?.placements.filter(_=>V(_.entity_id)==="light"&&(_.mount??"ceiling")==="ceiling"&&D([_.x,_.z],e.points)).length,p=new Set(e.panel??[]),g=new Map;for(let _ of this._doc.floors)for(let k of[..._.placements.map($=>[$.entity_id,$.x,$.z]),..._.furniture.filter($=>ue($.type)&&$.entity).map($=>[$.entity,$.x,$.z])]){let $=_.rooms.find(S=>D([k[1],k[2]],S.points));$&&$.id!==e.id&&g.set(k[0],$.name)}let f=(_,k=!1,$=i)=>{let S=r.has(_),z=S?void 0:g.get(_);return v`<div class="fp3d-row fp3d-dev-row ${k?"fp3d-dev-extra":""}">
        <button class="fp3d-dev-name ${S?"":"fp3d-muted"}" ?disabled=${!S} @click=${()=>this.selectItem("device",_)}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d=${ft(V(_))} />
          </svg>
          <span>${Z(n,_,$)}${z?v`<small class="fp3d-muted"> · ${this.t("devices_placed_in",{room:z})}</small>`:w}</span>
        </button>
        ${t&&!S?v`<button
              class="fp3d-pin ${p.has(_)?"fp3d-pin-on":""}"
              aria-pressed=${p.has(_)}
              title=${this.t(p.has(_)?"panel_unpin":"panel_pin")}
              @click=${()=>this.updateRoom({panel:p.has(_)?[...p].filter(A=>A!==_):[...p,_]})}
            >
              ${p.has(_)?"\u2605":"\u2606"}
            </button>`:w}
        ${t?S?v`<button class="fp3d-link" @click=${()=>this.removeDevice(_)}>${this.t("devices_remove")}</button>`:v`<button class="fp3d-link" @click=${()=>this.placeDevices([_])}>${this.t("devices_place")}</button>`:w}
      </div>`},u=t?this._devSource:"area",y=_=>{this._devSource=_,this._deviceQuery=""},b=v`<input
      class="fp3d-search"
      type="search"
      placeholder=${this.t("devices_search")}
      .value=${this._deviceQuery}
      @input=${_=>this._deviceQuery=_.target.value}
    />`,m=()=>{confirm(this.t("devices_place_all_confirm",{n:l.length}))&&this.placeDevices(l)};return v`<section>
      <h3>${this.t("devices")}</h3>
      <p class="fp3d-sub">${this.t("devices_panel_hint")}</p>
      ${t?v`<div class="fp3d-seg fp3d-dev-source">
            <button aria-pressed=${u==="area"} @click=${()=>y("area")}>${this.t("devices_src_area")}${s.length?` (${a.length})`:""}</button>
            <button aria-pressed=${u==="other"} @click=${()=>y("other")}>${this.t("devices_src_other")}</button>
            <button aria-pressed=${u==="none"} @click=${()=>y("none")}>${this.t("devices_src_none")}</button>
          </div>`:w}
      ${u!=="area"?v`${b}${this.renderDeviceExtras(e,f,u)}`:e.area_id?s.length?v`${t&&(h??0)>=2?v`<button class="fp3d-btn fp3d-wide-btn" @click=${()=>this.spreadCeilingLights(e)}>${this.t("lights_spread")}</button>`:w}
              ${s.length>8?b:w}
              <div class="fp3d-room-list">
                ${a.map(_=>{let k=_.others.filter(d),$=this._expanded.has(_.primary)||!!c&&k.length>0;return!d(_.primary)&&!k.length?w:v`${f(_.primary)}
                  ${_.others.length?v`<button
                        class="fp3d-more"
                        @click=${()=>{let S=new Set(this._expanded);S.has(_.primary)?S.delete(_.primary):S.add(_.primary),this._expanded=S}}
                      >
                        ${$?this.t("devices_less"):this.t("devices_more",{n:_.others.length})}
                      </button>`:w}
                  ${$?(c?k:_.others).map(S=>f(S,!0)):w}`})}
              </div>
              ${t&&l.length>1?v`<button class="fp3d-link fp3d-place-all" @click=${m}>${this.t("devices_place_all_n",{n:l.length})}</button>`:w}
              <p class="fp3d-sub">${this.t("devices_hint")}</p>`:v`<p class="fp3d-sub">${this.t("devices_none")}</p>`:v`<p class="fp3d-sub">${this.t("devices_none_area")}</p>`}
    </section>`}renderDeviceExtras(e,t,n){let i=this.hass;if(!i)return w;let s=50,r=this._deviceQuery.trim().toLowerCase(),a=(d,h)=>!r||`${Z(i,d,h)} ${d} ${h??""}`.toLowerCase().includes(r),l=d=>d>0?v`<p class="fp3d-sub">${this.t("devices_narrow",{n:d})}</p>`:w;if(n==="other"){let d=0,h=0,p=ds(i,e.area_id).map(g=>{let f=g.ids.filter(y=>a(y,g.name)),u=f.slice(0,Math.max(0,s-d));return d+=u.length,h+=f.length-u.length,u.length?v`<div class="fp3d-dev-area">${g.name}</div>${u.map(y=>t(y,!1,g.name))}`:w});return d?v`<div class="fp3d-room-list">${p}</div>${l(h)}`:v`<p class="fp3d-sub">${this.t("devices_none")}</p>`}let c=hs(i).filter(d=>a(d));return c.length?v`<div class="fp3d-room-list">${c.slice(0,s).map(d=>t(d))}</div>${l(c.length-Math.min(c.length,s))}`:v`<p class="fp3d-sub">${this.t("devices_none")}</p>`}renderRoomClimate(e){let t=this.hass;if(!t)return w;let n=(r,a)=>{let l={...e.climate??{},[r]:a},c=Object.values(l).every(d=>d==null);this.updateRoom({climate:c?null:l})},i=!!e.climate&&Object.values(e.climate).some(r=>r!=null),s=(r,a)=>{let l=wn[r],c=us(t,this.floor??null,{...e,climate:null},r),d=this.entityOptions(h=>h.startsWith("sensor.")&&t.states[h]?.attributes.device_class===l).map(h=>({...h,rank:(Mt(t,h.id)===e.area_id?0:1)+(kn(t,h.id)?0:2)})).sort((h,p)=>h.rank-p.rank).map(({id:h,label:p})=>({id:h,label:p}));return this.entitySelect(a,e.climate?.[r]??null,c[0]??null,d,h=>n(r,h))};return v`<details class="fp3d-points" ?open=${i}>
      <summary>${this.t("climate")}</summary>
      <div class="fp3d-form">
        ${s("temperature",this.t("climate_temperature"))} ${s("humidity",this.t("climate_humidity"))} ${s("co2",this.t("climate_co2"))}
      </div>
      <p class="fp3d-sub">${this.t("climate_hint")}</p>
    </details>`}renderBackgroundForm(e){let t=e.background;return v`<details class="fp3d-section">
      <summary>${this.t("background")}</summary>
      <div class="fp3d-form">
        <label class="fp3d-btn fp3d-wide fp3d-upload"
          >${this.t("background_upload")}<input type="file" accept="image/png,image/jpeg,image/webp" @change=${this.uploadBackground}
        /></label>
        ${t?v`${this.num(this.t("x"),t.x,n=>this.updateFloor({background:{...t,x:n}}))}
              ${this.num(this.t("z"),t.z,n=>this.updateFloor({background:{...t,z:n}}))}
              ${this.num(this.t("background_width"),t.width,n=>this.updateFloor({background:{...t,width:Math.max(.1,n)}}),.01,.1)}
              <label class="fp3d-field"
                >${this.t("background_opacity")}
                <input
                  type="range"
                  min="0.05"
                  max="1"
                  step="0.05"
                  .value=${String(t.opacity)}
                  @change=${n=>this.updateFloor({background:{...t,opacity:parseFloat(n.target.value)}})}
              /></label>
              <button class="fp3d-btn fp3d-danger fp3d-wide" @click=${()=>this.updateFloor({background:null})}>${this.t("background_remove")}</button>`:w}
      </div>
    </details>`}async loadHistory(){if(this.hass)try{this._history=await gi(this.hass)}catch{this._history=[]}}async restoreFromHistory(e){!this.hass||!confirm(this.t("backup_restore_confirm",{time:this.snapshotTime(e)}))||(await bi(this.hass,e.id),this._notice=this.t("backup_restored"),await this.loadHistory())}async exportBackup(){if(this.hass){this._backupBusy=!0;try{let e=await Ei(this.hass),t={};for(let i of is(e.building))try{t[i]=await en(this.hass,i)}catch{}let n=new Date().toISOString().slice(0,10);vn(`neonplan3d-${this.t("export_name_full")}-${n}.json`,JSON.stringify({...e,exported_at:new Date().toISOString(),images:t}))}catch(e){alert(this.t("backup_import_error",{error:String(e?.message??e)}))}finally{this._backupBusy=!1}}}async importBackup(e){let t=e.target,n=t.files?.[0];if(t.value="",!n||!this.hass)return;let i;try{i=JSON.parse(await n.text())}catch{alert(this.t("import_error_not_json"));return}if(i?.format!=="neonplan3d-backup"||!i.building){alert(this.t("backup_full_not_backup"));return}if(confirm(this.t("backup_full_confirm"))){this._backupBusy=!0;try{let s=await Fi(this.hass,i.building,i.packs??[]),r=0;for(let[l,c]of Object.entries(i.images??{}))try{await wt(this.hass,l,c),r++}catch{}this.setDoc($t(s.building)),this._floorId=s.building.floors[0]?.id??null,this.selectItem("room",null),this.fit(),this.dispatchEvent(new CustomEvent("packs-changed",{bubbles:!0,composed:!0}));let a=s.skipped.length?` ${this.t("backup_full_skipped",{packs:s.skipped.map(l=>l.id).join(", ")})}`:"";this._notice=this.t("backup_full_restored",{packs:s.packs,pictures:r})+a}catch(s){let{code:r,message:a}=s??{};alert(this.t("backup_import_error",{error:a??r??String(s)}))}finally{this._backupBusy=!1}}}exportPlan(e){let t=new Date().toISOString().slice(0,10);vn(`neonplan3d-${this.t(e?"export_name_template":"export_name_backup")}-${t}.json`,JSON.stringify(ts(this._doc,e),null,2))}async importPlan(e){let t=e.target,n=t.files?.[0];if(t.value="",!n||!this.hass)return;let i;try{i=ns(await n.text())}catch(s){let r=s.message;alert(r==="not_json"?this.t("import_error_not_json"):r==="not_plan"?this.t("import_error_not_plan"):this.t("backup_import_error",{error:r}));return}confirm(this.t("backup_import_confirm"))&&(await _i(this.hass).catch(()=>{}),this.setDoc(i),this._floorId=i.floors[0]?.id??null,this.selectItem("room",null),this.fit(),this._notice=this.t("backup_imported"))}snapshotTime(e){return new Date(e.saved_at*1e3).toLocaleString(this.hass?.language,{dateStyle:"short",timeStyle:"short"})}renderBackup(){return v`<details
      class="fp3d-section"
      @toggle=${e=>{e.target.open&&this.loadHistory()}}
    >
      <summary>${this.t("backup")}</summary>
      <h4 class="fp3d-lib-head">${this.t("backup_history")}</h4>
      ${this._history===null?v`<p class="fp3d-sub">${this.t("loading")}</p>`:this._history.length?v`<div class="fp3d-room-list">
              ${this._history.map(e=>v`<div class="fp3d-row fp3d-dev-row">
                  <span>${this.snapshotTime(e)} <span class="fp3d-muted">· ${this.t("backup_summary",{rooms:e.rooms,furniture:e.furniture})}</span></span>
                  <button class="fp3d-link" @click=${()=>this.restoreFromHistory(e)}>${this.t("backup_restore")}</button>
                </div>`)}
            </div>`:v`<p class="fp3d-sub">${this.t("backup_none")}</p>`}
      <h4 class="fp3d-lib-head">${this.t("backup_file")}</h4>
      <div class="fp3d-actions">
        <button class="fp3d-btn" @click=${()=>this.exportPlan(!1)}>${this.t("backup_export")}</button>
        <button class="fp3d-btn" title=${this.t("backup_export_share_hint")} @click=${()=>this.exportPlan(!0)}>${this.t("backup_export_share")}</button>
        <label class="fp3d-btn fp3d-upload"
          >${this.t("backup_import")}<input type="file" accept="application/json,.json" @change=${this.importPlan}
        /></label>
      </div>
      <p class="fp3d-sub">${this.t("backup_hint")}</p>
      <h4 class="fp3d-lib-head">${this.t("backup_full")}</h4>
      <div class="fp3d-actions">
        <button class="fp3d-btn" ?disabled=${this._backupBusy} @click=${()=>this.exportBackup()}>${this._backupBusy?"\u2026":this.t("backup_full_export")}</button>
        <label class="fp3d-btn fp3d-upload"
          >${this.t("backup_full_import")}<input type="file" accept="application/json,.json" @change=${this.importBackup}
        /></label>
      </div>
      <p class="fp3d-sub">${this.t("backup_full_hint")}</p>
    </details>`}renderSettings(){let e=this._doc.settings,t=n=>{let i=structuredClone(this._doc);Object.assign(i.settings,n),this.setDoc(i)};return v`<details class="fp3d-section">
      <summary>${this.t("settings")}</summary>
      <div class="fp3d-form">
        ${this.num(this.t("wall_exterior"),e.wall_exterior,n=>t({wall_exterior:Math.min(1,Math.max(.02,n))}),.01,.02)}
        ${this.num(this.t("wall_interior"),e.wall_interior,n=>t({wall_interior:Math.min(1,Math.max(.02,n))}),.01,.02)}
        ${this.num(this.t("grid"),e.grid,n=>t({grid:Math.min(1,Math.max(.01,n))}),.01,.01)}
        ${this.num(this.t("north"),e.north,n=>t({north:(Math.round(n)%360+360)%360}),1)}
        <label class="fp3d-field fp3d-wide"
          >${this.t("roof")}
          <select
            @change=${n=>{let i=n.target.value;i==="custom"?(this.useRoofSections(),this._tool="roof"):t({roof:{...e.roof,type:i}})}}
          >
            ${["none","flat","gable","custom"].map(n=>v`<option value=${n} ?selected=${n===e.roof.type}>${this.t(`roof_${n}`)}</option>`)}
          </select></label
        >
        ${e.roof.type==="gable"?v`<label class="fp3d-field fp3d-wide"
              >${this.t("roof_ridge")}
              <select @change=${n=>t({roof:{...e.roof,ridge:n.target.value==="short"?"short":null}})}>
                <option value="long" ?selected=${e.roof.ridge!=="short"}>${this.t("roof_ridge_long")}</option>
                <option value="short" ?selected=${e.roof.ridge==="short"}>${this.t("roof_ridge_short")}</option>
              </select></label
            >`:w}
        ${e.roof.type==="gable"?this.num(this.t("roof_pitch"),e.roof.pitch,n=>t({roof:{...e.roof,pitch:Math.min(60,Math.max(5,n))}}),1,5):w}
        ${e.roof.type!=="none"?this.num(this.t("roof_overhang"),e.roof.overhang,n=>t({roof:{...e.roof,overhang:Math.min(2,Math.max(0,n))}}),.05,0):w}
        ${this.hass?this.entitySelect(this.t("weather_entity"),e.weather_entity??null,zs(this.hass,null),this.entityOptions(n=>n.startsWith("weather.")),n=>t({weather_entity:n})):w}
        <div class="fp3d-sub fp3d-wide">${this.t("weather_effects")}</div>
        ${Bi.map(n=>{let i=e.weather_effects??dn;return v`<label class="fp3d-check"
            ><input
              type="checkbox"
              .checked=${i.includes(n)}
              @change=${s=>{let r=s.target.checked;t({weather_effects:r?[...new Set([...i,n])]:i.filter(a=>a!==n)})}}
            />
            ${this.t(`weather_effect_${n}`)}</label
          >`})}
        <label class="fp3d-check fp3d-wide"
          ><input type="checkbox" .checked=${e.rain_warning!==!1} @change=${n=>t({rain_warning:n.target.checked})} />
          ${this.t("rain_warning")}</label
        >
      </div>
      <p class="fp3d-sub">${this.t("north_hint")} ${this.t("weather_entity_hint")}</p>
    </details>`}static styles=[Ne,Ht,oe`
      :host {
        display: block;
        height: 100%;
      }
      .fp3d-editor {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 320px;
        height: 100%;
        min-height: 0;
      }
      .fp3d-editor:has(> .fp3d-side-strip) {
        grid-template-columns: 1fr 52px;
      }
      .fp3d-side-strip {
        padding: 10px 6px;
        gap: 8px;
        align-items: center;
      }
      .fp3d-strip-btn {
        width: 40px;
        height: 40px;
        border: 1px solid var(--fp3d-line);
        border-radius: 12px;
        background: var(--fp3d-chrome);
        color: var(--fp3d-text);
        font-size: 18px;
        cursor: pointer;
      }
      .fp3d-strip-hot {
        border-color: var(--fp3d-accent);
        color: var(--fp3d-accent);
      }
      .fp3d-side-overlay {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: min(340px, 60%);
        z-index: 6;
        box-shadow: -12px 0 32px rgba(0, 0, 0, 0.45);
      }
      .fp3d-pin-row {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      .fp3d-3d-size {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: var(--fp3d-muted);
        font-size: 12px;
      }
      .fp3d-3d-size input {
        width: 58px;
        padding: 4px 6px;
        font: inherit;
        color: var(--fp3d-text);
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 8px;
      }
      .fp3d-3d-select {
        font: inherit;
        color: var(--fp3d-text);
        background: var(--fp3d-chrome-solid);
        border: 1px solid var(--fp3d-line);
        border-radius: 999px;
        padding: 4px 10px;
      }
      .fp3d-editor.fp3d-narrow {
        grid-template-columns: 1fr;
        grid-template-rows: minmax(360px, 62vh) auto;
        height: auto;
      }
      .fp3d-main {
        display: grid;
        grid-template-rows: auto 1fr;
        min-height: 0;
        min-width: 0;
      }
      .fp3d-toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        padding: 10px 12px;
      }
      .fp3d-warn {
        color: var(--fp3d-warm);
        font-size: 12.5px;
      }
      .fp3d-picture-group {
        display: grid;
        gap: 6px;
        margin: 6px 0 10px;
        padding: 8px;
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
      }
      .fp3d-picture-group > select {
        min-width: 0;
      }
      .fp3d-picture-row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 6px;
        align-items: center;
        padding: 6px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--fp3d-line) 40%, transparent);
      }
      .fp3d-picture-row input[type="url"] {
        grid-column: 1 / -1;
        min-width: 0;
      }
      .fp3d-picture-row > .fp3d-sub,
      .fp3d-picture-row > .fp3d-picture-camera {
        grid-column: 1 / -1;
      }
      .fp3d-picture-row.fp3d-rule-hit {
        outline: 1px solid var(--fp3d-accent);
      }
      .fp3d-rule-now {
        grid-column: 1 / -1;
      }
      .fp3d-rule-hit {
        color: var(--fp3d-accent);
      }
      .fp3d-picture-reuse {
        grid-column: 1 / -1;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .fp3d-picture-reuse-btn {
        padding: 2px;
        border: 1px solid var(--fp3d-line);
        border-radius: 6px;
        background: var(--fp3d-chrome-solid);
        cursor: pointer;
      }
      .fp3d-picture-reuse-btn img {
        display: block;
        height: 28px;
        max-width: 60px;
        object-fit: contain;
      }
      .fp3d-picture-reuse-btn:hover {
        border-color: var(--fp3d-accent);
      }
      .fp3d-picture-thumb {
        max-height: 60px;
        max-width: 100%;
        border-radius: 6px;
        justify-self: start;
      }
      .fp3d-picture-pick {
        justify-self: start;
      }
      .fp3d-parking-row {
        display: flex;
        gap: 6px;
        align-items: center;
        margin: 4px 0;
      }
      .fp3d-parking-row input,
      .fp3d-parking-row select {
        flex: 1;
        min-width: 0;
      }
      .fp3d-stage-pair {
        display: flex;
        min-height: 0;
        min-width: 0;
      }
      .fp3d-stage-pair > .fp3d-canvas-wrap {
        flex: 1 1 var(--fp3d-split, 55%);
        min-width: 0;
      }
      .fp3d-split > .fp3d-canvas-wrap {
        flex: 0 0 var(--fp3d-split, 55%);
      }
      .fp3d-split-handle {
        flex: 0 0 8px;
        cursor: col-resize;
        background: var(--fp3d-line);
        touch-action: none;
      }
      .fp3d-split-handle:hover {
        background: var(--fp3d-accent);
      }
      .fp3d-editor-3d {
        position: relative;
        flex: 1 1 0;
        min-width: 240px;
        min-height: 0;
        border-left: 1px solid var(--fp3d-line);
        container-type: size;
        container-name: fp3d;
      }
      .fp3d-editor-3d fp3d-view3d {
        display: block;
        height: 100%;
      }
      .fp3d-3d-walls {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 3;
      }
      .fp3d-3d-bar {
        position: absolute;
        left: 50%;
        bottom: 12px;
        transform: translateX(-50%);
        z-index: 3;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 8px;
        max-width: calc(100% - 24px);
        padding: 6px 8px 6px 14px;
        border-radius: 999px;
        background: var(--fp3d-chrome);
        box-shadow: var(--fp3d-shadow);
        font-size: 13px;
      }
      .fp3d-danger-chip {
        color: var(--fp3d-danger, #ff6b7a);
      }
      .fp3d-narrow .fp3d-stage-pair.fp3d-split {
        flex-direction: column;
      }
      .fp3d-narrow .fp3d-split > .fp3d-canvas-wrap {
        flex: 1 1 auto;
      }
      .fp3d-narrow .fp3d-editor-3d {
        flex: 0 0 42%;
        min-width: 0;
        border-left: none;
        border-top: 1px solid var(--fp3d-line);
      }
      .fp3d-canvas-wrap {
        position: relative;
        min-height: 0;
        overflow: hidden;
        background: radial-gradient(ellipse at 50% 35%, var(--fp3d-bg2), var(--fp3d-bg) 75%);
      }
      svg.fp3d-plan {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
        cursor: default;
      }
      svg.fp3d-tool-rect,
      svg.fp3d-tool-polygon {
        cursor: crosshair;
      }
      .fp3d-grid-minor {
        stroke: rgba(55, 224, 255, 0.05);
        stroke-width: 1;
      }
      .fp3d-grid-major {
        stroke: rgba(91, 124, 255, 0.16);
        stroke-width: 1;
      }
      .fp3d-origin {
        fill: rgba(91, 124, 255, 0.5);
      }
      .fp3d-ghost {
        fill: none;
        stroke: rgba(138, 155, 184, 0.35);
        stroke-dasharray: 4 4;
      }
      .fp3d-wall {
        fill: #1b2a47;
      }
      .fp3d-wall-ext {
        fill: #22345a;
      }
      .fp3d-room {
        fill: rgba(55, 224, 255, 0.05);
        stroke: rgba(55, 224, 255, 0.75);
        stroke-width: 1.5;
        stroke-linejoin: round;
        cursor: pointer;
      }
      .fp3d-room:hover {
        fill: rgba(55, 224, 255, 0.09);
      }
      .fp3d-room-sel {
        fill: rgba(55, 224, 255, 0.14);
        stroke: var(--fp3d-accent);
        stroke-width: 2.5;
      }
      .fp3d-room-name {
        fill: var(--fp3d-text);
        font: 600 13px var(--fp3d-title-font);
        text-anchor: middle;
      }
      .fp3d-room-area {
        fill: var(--fp3d-muted);
        font: 500 11.5px var(--fp3d-font);
        text-anchor: middle;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-dim {
        fill: var(--fp3d-accent);
        font: 600 11.5px var(--fp3d-font);
        text-anchor: middle;
        font-variant-numeric: tabular-nums;
        paint-order: stroke;
        stroke: var(--fp3d-bg);
        stroke-width: 3px;
      }
      .fp3d-vertex circle:not(.fp3d-hit) {
        fill: var(--fp3d-bg);
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-vertex-sel circle:not(.fp3d-hit) {
        fill: var(--fp3d-accent);
      }
      .fp3d-vertex,
      .fp3d-mid {
        cursor: grab;
      }
      .fp3d-hit {
        fill: transparent;
      }
      .fp3d-mid circle:not(.fp3d-hit) {
        fill: rgba(91, 124, 255, 0.35);
        stroke: var(--fp3d-soft);
      }
      .fp3d-mid path {
        stroke: var(--fp3d-text);
        stroke-width: 1.5;
      }
      .fp3d-draft {
        fill: rgba(255, 181, 71, 0.08);
        stroke: var(--fp3d-warm);
        stroke-width: 2;
        stroke-dasharray: 6 4;
      }
      polyline.fp3d-draft {
        fill: none;
      }
      .fp3d-draft-pt {
        fill: var(--fp3d-warm);
      }
      .fp3d-draft-first {
        fill: transparent;
        stroke: var(--fp3d-warm);
        stroke-width: 2;
      }
      .fp3d-cursor {
        fill: var(--fp3d-warm);
      }
      .fp3d-guide {
        stroke: rgba(255, 95, 210, 0.55);
        stroke-dasharray: 3 5;
      }
      .fp3d-snap {
        fill: none;
        stroke: #ff5fd2;
        stroke-width: 2;
      }
      .fp3d-hint {
        position: absolute;
        left: 12px;
        right: 12px;
        bottom: 8px;
        margin: 0;
        font-size: 12px;
        color: var(--fp3d-muted);
        pointer-events: none;
      }
      .fp3d-side {
        border-left: 1px solid var(--fp3d-line);
        background: var(--fp3d-chrome-solid);
        overflow-y: auto;
        padding: 12px 14px 24px;
        display: flex;
        flex-direction: column;
        gap: 18px;
        min-height: 0;
      }
      .fp3d-narrow .fp3d-side {
        border-left: none;
        border-top: 1px solid var(--fp3d-line);
      }
      h3,
      summary {
        margin: 0 0 8px;
        font-size: 11.5px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--fp3d-muted);
        font-weight: 600;
      }
      summary {
        cursor: pointer;
        margin: 0;
      }
      details[open] > summary {
        margin-bottom: 8px;
      }
      .fp3d-floor-list,
      .fp3d-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .fp3d-floor-list .fp3d-chip {
        box-shadow: none;
        border: 1px solid var(--fp3d-line);
      }
      .fp3d-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
        margin-top: 10px;
      }
      .fp3d-wide {
        grid-column: 1 / -1;
      }
      .fp3d-room-list {
        display: grid;
        gap: 2px;
      }
      .fp3d-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        font: inherit;
        color: var(--fp3d-text);
        background: none;
        border: none;
        border-bottom: 1px solid var(--fp3d-line);
        padding: 9px 2px;
        cursor: pointer;
        text-align: left;
      }
      .fp3d-row:hover {
        color: var(--fp3d-accent);
      }
      .fp3d-check {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: var(--fp3d-muted);
      }
      .fp3d-check input {
        accent-color: var(--fp3d-accent);
      }
      .fp3d-meter rect {
        fill: #2a2a10;
        stroke: #ffc633;
        stroke-width: 1.5;
      }
      .fp3d-meter path {
        fill: #ffc633;
      }
      .fp3d-packages {
        display: grid;
        gap: 6px;
        margin-top: 10px;
      }
      .fp3d-packages .fp3d-btn {
        display: grid;
        text-align: left;
        gap: 2px;
      }
      .fp3d-packages .fp3d-btn span {
        font-weight: 400;
        font-size: 12px;
        color: var(--fp3d-muted);
      }
      .fp3d-arrows {
        display: grid;
        grid-template-columns: repeat(3, 52px);
        grid-template-areas: ". up ." "left . right" ". down .";
        gap: 6px;
        justify-content: center;
      }
      .fp3d-arrows .fp3d-btn {
        font-size: 20px;
        padding: 6px 0;
      }
      .fp3d-arrow-up {
        grid-area: up;
      }
      .fp3d-arrow-left {
        grid-area: left;
      }
      .fp3d-arrow-right {
        grid-area: right;
      }
      .fp3d-arrow-down {
        grid-area: down;
      }
      .fp3d-measure-list {
        margin: 8px 0;
        padding-left: 22px;
        color: var(--fp3d-muted);
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }
      .fp3d-library {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(118px, 1fr));
        gap: 6px;
        margin-top: 8px;
      }
      .fp3d-library .fp3d-btn {
        font-weight: 500;
        font-size: 13px;
      }
      .fp3d-furn-body {
        fill: rgba(91, 124, 255, 0.1);
        stroke: rgba(91, 124, 255, 0.55);
        stroke-width: 1.2;
        vector-effect: non-scaling-stroke;
        cursor: grab;
      }
      .fp3d-furn-sym * {
        fill: none;
        stroke: rgba(150, 175, 255, 0.55);
        stroke-width: 1;
        vector-effect: non-scaling-stroke;
        pointer-events: none;
      }
      .fp3d-furn-sym .fp3d-sym-fill {
        fill: rgba(91, 124, 255, 0.28);
      }
      .fp3d-furn-sym .fp3d-sym-strong {
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-out polygon {
        fill: rgba(91, 124, 255, 0.06);
        stroke: rgba(91, 124, 255, 0.4);
        stroke-width: 1;
        stroke-dasharray: 4 3;
        cursor: grab;
      }
      .fp3d-out-lawn polygon,
      .fp3d-out-bed polygon,
      .fp3d-out-hedge polygon {
        fill: rgba(61, 224, 160, 0.1);
        stroke: rgba(61, 224, 160, 0.5);
      }
      .fp3d-out-pool polygon {
        fill: rgba(55, 224, 255, 0.18);
        stroke: var(--fp3d-accent);
      }
      .fp3d-out-terrace polygon {
        fill: rgba(150, 130, 255, 0.12);
      }
      .fp3d-free-wall {
        cursor: grab;
      }
      .fp3d-vertex-no {
        fill: var(--fp3d-accent);
        font-size: 11px;
        font-weight: 700;
        pointer-events: none;
      }
      .fp3d-edge-box {
        margin: 12px 0;
        padding: 10px 12px;
        border: 1px solid color-mix(in srgb, var(--fp3d-accent) 45%, transparent);
        border-radius: 12px;
        background: color-mix(in srgb, var(--fp3d-accent) 6%, transparent);
      }
      .fp3d-edge-box h4 {
        margin: 0 0 4px;
        color: var(--fp3d-accent);
        font-size: 13px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .fp3d-edge-height {
        display: grid;
        grid-template-columns: 1fr 1fr 40px;
        gap: 6px;
        align-items: end;
        padding: 4px 6px;
        margin: 0 -6px;
        border-radius: 8px;
      }
      .fp3d-edge-on {
        background: color-mix(in srgb, var(--fp3d-accent) 14%, transparent);
      }
      .fp3d-edge-low b {
        color: var(--fp3d-accent);
      }
      .fp3d-wall-low {
        opacity: 0.55;
      }
      .fp3d-dev-source {
        display: flex;
        margin: 8px 0;
      }
      .fp3d-dev-source button {
        flex: 1 1 0;
        min-width: 0;
        padding: 6px 4px;
        font-size: 12px;
        line-height: 1.2;
        white-space: normal;
        text-align: center;
        border-radius: 10px;
      }
      .fp3d-place-all {
        margin: 10px 0 0;
      }
      .fp3d-roof-sec polygon {
        fill: color-mix(in srgb, #ffb547 10%, transparent);
        stroke: #ffb547;
        stroke-width: 2;
        stroke-dasharray: 8 6;
        cursor: move;
      }
      .fp3d-roof-sel polygon {
        fill: color-mix(in srgb, var(--fp3d-accent) 14%, transparent);
        stroke: var(--fp3d-accent);
        stroke-dasharray: none;
      }
      /* solar modules: dark blue panes with a light frame, so they do not look like a selected room */
      .fp3d-roofwin polygon {
        fill: color-mix(in srgb, #2b6b8f 70%, transparent);
        stroke: #e3e9f5;
        stroke-width: 2;
        cursor: move;
      }
      .fp3d-roofwin-sel polygon {
        stroke: #ffd75a;
      }
      .fp3d-tool-energy .fp3d-roof-layer {
        opacity: 0.45;
      }
      .fp3d-tool-energy .fp3d-energy-item {
        pointer-events: auto;
      }
      /* the cables in the energy tool: faint automatic ways, solid laid ones */
      .fp3d-cable line {
        stroke: #ffd75a;
        stroke-width: 2;
        stroke-dasharray: 5 4;
        opacity: 0.8;
        pointer-events: none;
      }
      .fp3d-cable-bat line {
        stroke: #5dffb0;
      }
      .fp3d-cable-grid line {
        stroke: #4ff6ff;
      }
      .fp3d-cable-hit line {
        stroke-width: 12;
        opacity: 0;
        pointer-events: stroke;
        cursor: pointer;
      }
      .fp3d-cable-laid line {
        stroke-dasharray: none;
        opacity: 0.9;
      }
      .fp3d-cable-sel line {
        stroke-width: 2.5;
        opacity: 1;
        filter: drop-shadow(0 0 4px currentColor);
      }
      .fp3d-cable-sel .fp3d-cable-piece {
        stroke-width: 14;
        opacity: 0;
        pointer-events: stroke;
        cursor: copy;
      }
      .fp3d-cable .fp3d-vertex circle {
        pointer-events: auto;
      }
      .fp3d-energy-marker {
        cursor: move;
      }
      .fp3d-teaser {
        margin-top: 12px;
        padding: 12px;
        border-radius: 14px;
        border: 1px solid color-mix(in srgb, #ffd75a 45%, transparent);
        background: linear-gradient(160deg, color-mix(in srgb, #ffd75a 10%, transparent), transparent 60%);
      }
      .fp3d-teaser-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .fp3d-teaser-soon {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: #0b1426;
        background: #ffd75a;
        border-radius: 999px;
        padding: 2px 8px;
        white-space: nowrap;
      }
      .fp3d-teaser img {
        display: block;
        width: 100%;
        border-radius: 10px;
        border: 1px solid color-mix(in srgb, var(--fp3d-accent) 40%, transparent);
      }
      .fp3d-teaser ul {
        margin: 8px 0 4px;
        padding-left: 18px;
        font-size: 13px;
      }
      /* the roof and energy tools say what can be moved there (everything else is locked) */
      .fp3d-tool-note {
        position: absolute;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        max-width: calc(100% - 24px);
        padding: 5px 12px;
        border-radius: 999px;
        background: color-mix(in srgb, #0b1426 85%, transparent);
        border: 1px solid color-mix(in srgb, #ffd75a 60%, transparent);
        color: #ffe7a3;
        font-size: 12px;
        text-align: center;
        pointer-events: none;
      }
      .fp3d-energy-marker circle {
        fill: color-mix(in srgb, #0b1426 80%, transparent);
        stroke: #ffd75a;
        stroke-width: 2;
      }
      .fp3d-energy-marker-sel circle {
        stroke: var(--fp3d-accent);
        stroke-width: 3;
        fill: color-mix(in srgb, var(--fp3d-accent) 25%, #0b1426);
      }
      .fp3d-energy-marker text {
        text-anchor: middle;
        pointer-events: none;
      }
      .fp3d-energy-icon {
        font-size: 17px;
      }
      .fp3d-energy-name {
        font-size: 11px;
        font-weight: 700;
        fill: #ffd75a;
        paint-order: stroke;
        stroke: rgba(0, 0, 0, 0.65);
        stroke-width: 3px;
      }
      .fp3d-solar polygon {
        fill: color-mix(in srgb, #1b3a8f 75%, transparent);
        stroke: #9fb8ff;
        stroke-width: 1.5;
        cursor: move;
      }
      .fp3d-solar-sel polygon {
        fill: color-mix(in srgb, #1b3a8f 80%, transparent);
        stroke: #ffd75a;
        stroke-width: 2;
      }
      .fp3d-solar polygon.fp3d-solar-off {
        fill: transparent;
        stroke-dasharray: 4 4;
        stroke-width: 1.5;
      }
      .fp3d-solar-pick polygon {
        cursor: pointer;
      }
      .fp3d-roof-ridge line {
        stroke: #ffb547;
        stroke-width: 2.5;
        pointer-events: none;
      }
      .fp3d-roof-sel .fp3d-roof-ridge line {
        stroke: var(--fp3d-accent);
      }
      .fp3d-roof-sec text {
        fill: #ffd28a;
        font-size: 12px;
        font-weight: 700;
        text-anchor: middle;
        paint-order: stroke;
        stroke: rgba(0, 0, 0, 0.6);
        stroke-width: 3px;
        pointer-events: none;
      }
      .fp3d-tool-energy .fp3d-room,
      .fp3d-tool-energy [data-furniture],
      .fp3d-tool-energy [data-device],
      .fp3d-tool-energy [data-opening],
      .fp3d-tool-energy [data-free-wall],
      .fp3d-tool-energy [data-outdoor],
      .fp3d-tool-energy .fp3d-roof-layer,
      .fp3d-tool-roof .fp3d-room,
      .fp3d-tool-roof [data-furniture],
      .fp3d-tool-roof [data-device],
      .fp3d-tool-roof [data-opening],
      .fp3d-tool-roof [data-free-wall],
      .fp3d-tool-roof [data-outdoor] {
        pointer-events: none;
      }
      .fp3d-dev-area {
        margin: 10px 0 2px;
        color: var(--fp3d-muted);
        font-size: 12px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .fp3d-h3row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .fp3d-h3row h3 {
        margin-bottom: 0;
      }
      .fp3d-fix {
        min-height: 30px;
        padding: 4px 10px;
        font-size: 13px;
      }
      .fp3d-fix[aria-pressed="true"] {
        border-color: var(--fp3d-accent);
        color: var(--fp3d-accent);
      }
      .fp3d-lock {
        font-size: 13px;
        text-anchor: middle;
        pointer-events: none;
      }
      .fp3d-hint-fixed {
        color: var(--fp3d-accent);
      }
      .fp3d-ctx {
        position: absolute;
        z-index: 5;
        display: flex;
        flex-direction: column;
        min-width: 170px;
        padding: 4px;
        border: 1px solid var(--fp3d-line);
        border-radius: 10px;
        background: var(--fp3d-panel, #111a2e);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
      }
      .fp3d-ctx button {
        padding: 8px 12px;
        border: none;
        border-radius: 7px;
        background: none;
        color: inherit;
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      .fp3d-ctx button:hover:not(:disabled) {
        background: color-mix(in srgb, var(--fp3d-accent) 16%, transparent);
      }
      .fp3d-ctx button:disabled {
        opacity: 0.45;
        cursor: default;
      }
      .fp3d-ctx-danger {
        color: var(--fp3d-danger, #ff6b7a) !important;
      }
      .fp3d-edge-hi {
        stroke: var(--fp3d-accent);
        stroke-width: 6;
        stroke-linecap: round;
        filter: drop-shadow(0 0 6px var(--fp3d-accent));
      }
      .fp3d-free-wall .fp3d-hit {
        stroke: transparent;
        stroke-width: 18;
      }
      .fp3d-free-wall-line {
        stroke: transparent;
        stroke-width: 1;
      }
      .fp3d-free-wall-sel .fp3d-free-wall-line {
        stroke: var(--fp3d-accent);
        stroke-width: 2;
        stroke-dasharray: 6 4;
      }
      .fp3d-draft-wall {
        stroke-width: 4;
      }
      .fp3d-open-passage {
        stroke-dasharray: 4 4;
      }
      .fp3d-out-sel polygon {
        stroke: var(--fp3d-accent);
        stroke-width: 2;
        stroke-dasharray: none;
      }
      .fp3d-out text {
        fill: var(--fp3d-muted);
        font-size: 11px;
        text-anchor: middle;
        pointer-events: none;
      }
      .fp3d-furn-lit .fp3d-furn-body {
        fill: rgba(255, 181, 71, 0.35);
        stroke: var(--fp3d-warm);
      }
      .fp3d-rotate {
        cursor: grab;
      }
      .fp3d-preview {
        position: fixed;
        z-index: 20;
        width: 180px;
        padding: 8px 8px 10px;
        border-radius: 16px;
        background: radial-gradient(circle at 50% 40%, #1d2c4d, #0b1222 75%);
        box-shadow: var(--fp3d-shadow), 0 0 0 1px var(--fp3d-line);
        text-align: center;
        pointer-events: none;
        animation: fp3d-pop 120ms ease-out;
      }
      @keyframes fp3d-pop {
        from {
          opacity: 0;
          transform: translateX(8px);
        }
      }
      .fp3d-preview img,
      .fp3d-preview-wait {
        display: block;
        width: 164px;
        height: 164px;
      }
      .fp3d-preview-wait {
        margin: 0 auto;
        border-radius: 12px;
        background: rgba(127, 127, 127, 0.1);
      }
      .fp3d-preview b {
        display: block;
        margin-top: 2px;
        font-size: 13px;
        color: #e8eeff;
      }
      .fp3d-lib-badge {
        margin-left: 4px;
        color: #37e0ff;
        vertical-align: -2px;
      }
      .fp3d-ext-teaser {
        display: grid;
        gap: 6px;
        margin: 12px 0;
        padding: 12px;
        border: 1px solid var(--fp3d-accent);
        border-radius: 12px;
        background: linear-gradient(135deg, rgba(55, 224, 255, 0.08), rgba(91, 124, 255, 0.08));
      }
      .fp3d-pin {
        border: 0;
        background: none;
        padding: 2px 6px;
        font-size: 17px;
        line-height: 1;
        color: var(--fp3d-muted);
        cursor: pointer;
      }
      .fp3d-pin-on {
        color: var(--fp3d-warm);
      }
      .fp3d-back {
        margin-bottom: 12px;
      }
      .fp3d-presets {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 10px;
      }
      .fp3d-resize {
        cursor: nwse-resize;
      }
      .fp3d-resize rect {
        fill: var(--fp3d-accent);
        stroke: #0b1222;
        stroke-width: 1.5;
      }
      .fp3d-floor-menu {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin: 8px 0;
        padding: 10px;
        border-radius: 12px;
        background: rgba(127, 127, 127, 0.1);
      }
      .fp3d-floor-menu .fp3d-btn {
        text-align: left;
      }
      .fp3d-rotate line {
        stroke: var(--fp3d-accent);
        stroke-dasharray: 3 3;
      }
      .fp3d-rotate circle:not(.fp3d-hit) {
        fill: #0b1222;
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-rotate path {
        fill: none;
        stroke: var(--fp3d-accent);
        stroke-width: 1.5;
        stroke-linecap: round;
      }
      .fp3d-lib-toggle {
        display: flex;
        align-items: center;
        gap: 6px;
        width: 100%;
        padding: 6px 0;
        border: 0;
        background: none;
        font: inherit;
        cursor: pointer;
        text-align: left;
      }
      .fp3d-lib-toggle:hover {
        color: var(--fp3d-text);
      }
      .fp3d-lib-caret {
        width: 12px;
        color: var(--fp3d-accent);
      }
      .fp3d-lib-count {
        margin-left: auto;
        font-weight: 500;
        letter-spacing: 0;
        text-transform: none;
        opacity: 0.7;
      }
      .fp3d-lib-head {
        margin: 10px 0 0;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--fp3d-muted);
      }
      .fp3d-furn-front {
        stroke: var(--fp3d-accent);
        stroke-width: 2.5;
        vector-effect: non-scaling-stroke;
        opacity: 0.8;
        pointer-events: none;
      }
      .fp3d-furn text {
        fill: var(--fp3d-muted);
        font-size: 11px;
        text-anchor: middle;
        pointer-events: none;
      }
      .fp3d-furn-sel .fp3d-furn-body {
        fill: rgba(55, 224, 255, 0.16);
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-open {
        cursor: grab;
      }
      .fp3d-open-gap {
        fill: #0b1222;
        stroke: none;
      }
      .fp3d-open path,
      .fp3d-open line {
        fill: none;
        stroke-width: 1.6;
        stroke-linecap: round;
      }
      .fp3d-open-door path {
        stroke: var(--fp3d-warm);
        stroke-dasharray: 3 3;
      }
      .fp3d-open-front path,
      .fp3d-open-door line {
        stroke: var(--fp3d-warm);
        stroke-width: 3;
        stroke-dasharray: none;
      }
      .fp3d-open-door line.fp3d-open-pane {
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-open-garage line {
        stroke: var(--fp3d-warm);
        stroke-width: 3;
      }
      .fp3d-open-track {
        stroke: var(--fp3d-warm);
        stroke-dasharray: 4 4;
        opacity: 0.6;
      }
      .fp3d-open-window line {
        stroke: var(--fp3d-accent);
        stroke-width: 2;
      }
      .fp3d-open-sel .fp3d-open-gap {
        fill: rgba(55, 224, 255, 0.25);
      }
      .fp3d-open-sel path,
      .fp3d-open-sel line {
        stroke-width: 2.4;
      }
      .fp3d-search {
        width: 100%;
        box-sizing: border-box;
        font: inherit;
        font-size: 14px;
        color: var(--fp3d-text);
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--fp3d-line);
        border-radius: 8px;
        padding: 7px 9px;
        margin: 2px 0 6px;
      }
      .fp3d-more {
        font: inherit;
        font-size: 12px;
        color: var(--fp3d-muted);
        background: none;
        border: none;
        text-align: left;
        padding: 2px 26px 8px;
        cursor: pointer;
      }
      .fp3d-more:hover {
        color: var(--fp3d-accent);
      }
      .fp3d-dev-extra {
        padding-left: 18px;
        font-size: 13px;
      }
      .fp3d-dev-title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 8px;
        font-weight: 600;
      }
      .fp3d-notice {
        color: var(--fp3d-accent);
      }
      .fp3d-device-sel circle:not(.fp3d-hit) {
        stroke: var(--fp3d-accent);
        stroke-width: 3;
      }
      .fp3d-dev-row {
        align-items: center;
        cursor: default;
      }
      .fp3d-dev-row:hover {
        color: var(--fp3d-text);
      }
      .fp3d-dev-name {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        font: inherit;
        color: inherit;
        background: none;
        border: none;
        padding: 0;
        text-align: left;
        cursor: pointer;
      }
      .fp3d-dev-name:disabled {
        cursor: default;
      }
      .fp3d-dev-name span {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .fp3d-dev-name svg {
        flex: none;
      }
      .fp3d-link {
        font: inherit;
        font-size: 13px;
        font-weight: 600;
        color: var(--fp3d-accent);
        background: none;
        border: none;
        padding: 4px 2px;
        cursor: pointer;
        white-space: nowrap;
      }
      .fp3d-wide-btn {
        width: 100%;
        margin-bottom: 6px;
      }
      .fp3d-device {
        cursor: grab;
      }
      .fp3d-wedge path,
      .fp3d-wedge circle:not(.fp3d-hit) {
        fill: rgba(55, 224, 255, 0.12);
        stroke: rgba(55, 224, 255, 0.45);
        stroke-width: 1;
        pointer-events: none;
      }
      .fp3d-wedge-sel path,
      .fp3d-wedge-sel > circle {
        fill: rgba(55, 224, 255, 0.2);
        stroke: var(--fp3d-accent);
      }
      .fp3d-wedge .fp3d-rotate circle {
        pointer-events: auto;
      }
      .fp3d-device circle:not(.fp3d-hit) {
        fill: #111a2e;
        stroke: var(--fp3d-soft);
        stroke-width: 1.5;
        vector-effect: non-scaling-stroke;
      }
      .fp3d-device path {
        fill: none;
        stroke: var(--fp3d-text);
        stroke-width: 2.6;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .fp3d-device-on circle:not(.fp3d-hit) {
        fill: var(--fp3d-warm);
        stroke: var(--fp3d-warm);
      }
      .fp3d-device-on path {
        stroke: #2a1a00;
      }
      .fp3d-muted {
        color: var(--fp3d-muted);
        font-variant-numeric: tabular-nums;
      }
      .fp3d-points {
        margin: 12px 0;
      }
      .fp3d-point {
        display: grid;
        grid-template-columns: 18px 1fr 1fr auto;
        gap: 6px;
        align-items: end;
        padding: 4px 0;
      }
      .fp3d-point-sel .fp3d-muted {
        color: var(--fp3d-accent);
      }
      .fp3d-point .fp3d-btn {
        min-height: 34px;
        padding: 4px 10px;
      }
      .fp3d-upload {
        position: relative;
        text-align: center;
        overflow: hidden;
      }
      .fp3d-upload input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
      }
      .fp3d-sub {
        margin: 8px 0 0;
        font-size: 12.5px;
        color: var(--fp3d-muted);
      }
      .fp3d-note {
        margin: 0;
        font-size: 12.5px;
        color: var(--fp3d-warm);
      }
    `]};customElements.get("fp3d-editor")||customElements.define("fp3d-editor",Zn);function Po(o,e,t){let n=t[0]-e[0],i=t[1]-e[1],s=n*n+i*i||1,r=Math.min(1,Math.max(0,((o[0]-e[0])*n+(o[1]-e[1])*i)/s));return Math.hypot(o[0]-e[0]-n*r,o[1]-e[1]-i*r)}export{Zn as Fp3dEditor};
