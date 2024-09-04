/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.121
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import{a as C}from"./chunk-X46KHFRR.js";import{a as v}from"./chunk-R6J5XT6F.js";import{b as z}from"./chunk-6RFFQXES.js";import"./chunk-3SZ2KFIJ.js";import{a as O}from"./chunk-WCULQRSM.js";import{a as Y}from"./chunk-DEURJWQY.js";import{b as B,c as q,d as y}from"./chunk-EYOGNPU4.js";import{d as R}from"./chunk-XTTU3BHR.js";import{h as b}from"./chunk-ENJVJZOJ.js";import{a as T}from"./chunk-D72SCI2M.js";import{a as U,b as M,d as w}from"./chunk-JVYZBXN3.js";import{a as P}from"./chunk-IK336IZH.js";import"./chunk-ZLLRWIEZ.js";import"./chunk-PBGNRG6Q.js";import{a as E}from"./chunk-4CQNOSGA.js";import{a as N}from"./chunk-KWWV4RVU.js";import{e as S}from"./chunk-UJJHFDLS.js";var j=new R,K=new R,Q=new U,W=new b;function F(t,e){let i=t._ellipsoid,m=e.height,s=e.width,h=e.northCap,a=e.southCap,_=m,A=2,o=0,g=4;h&&(A-=1,_-=1,o+=1,g-=2),a&&(A-=1,_-=1,o+=1,g-=2),o+=A*s+2*_-g;let n=new Float64Array(o*3),l=0,f=0,p,r=Q;if(h)C.computePosition(e,i,!1,f,0,r),n[l++]=r.x,n[l++]=r.y,n[l++]=r.z;else for(p=0;p<s;p++)C.computePosition(e,i,!1,f,p,r),n[l++]=r.x,n[l++]=r.y,n[l++]=r.z;for(p=s-1,f=1;f<m;f++)C.computePosition(e,i,!1,f,p,r),n[l++]=r.x,n[l++]=r.y,n[l++]=r.z;if(f=m-1,!a)for(p=s-2;p>=0;p--)C.computePosition(e,i,!1,f,p,r),n[l++]=r.x,n[l++]=r.y,n[l++]=r.z;for(p=0,f=m-2;f>0;f--)C.computePosition(e,i,!1,f,p,r),n[l++]=r.x,n[l++]=r.y,n[l++]=r.z;let u=n.length/3*2,c=O.createTypedArray(n.length/3,u),H=0;for(let D=0;D<n.length/3-1;D++)c[H++]=D,c[H++]=D+1;c[H++]=n.length/3-1,c[H++]=0;let d=new q({attributes:new Y,primitiveType:B.LINES});return d.attributes.position=new y({componentDatatype:T.DOUBLE,componentsPerAttribute:3,values:n}),d.indices=c,d}function X(t,e){let i=t._surfaceHeight,m=t._extrudedHeight,s=t._ellipsoid,h=F(t,e),a=e.height,_=e.width,A=z.scaleToGeodeticHeight(h.attributes.position.values,i,s,!1),o=A.length,g=new Float64Array(o*2);g.set(A);let n=z.scaleToGeodeticHeight(h.attributes.position.values,m,s);g.set(n,o),h.attributes.position.values=g;let l=e.northCap,f=e.southCap,p=4;l&&(p-=1),f&&(p-=1);let r=(g.length/3+p)*2,u=O.createTypedArray(g.length/3,r);o=g.length/6;let c=0;for(let d=0;d<o-1;d++)u[c++]=d,u[c++]=d+1,u[c++]=d+o,u[c++]=d+o+1;u[c++]=o-1,u[c++]=0,u[c++]=o+o-1,u[c++]=o,u[c++]=0,u[c++]=o;let H;if(l)H=a-1;else{let d=_-1;u[c++]=d,u[c++]=d+o,H=_+a-2}if(u[c++]=H,u[c++]=H+o,!f){let d=_+H-1;u[c++]=d,u[c]=d+o}return h.indices=u,h}function L(t){t=E(t,E.EMPTY_OBJECT);let e=t.rectangle,i=E(t.granularity,P.RADIANS_PER_DEGREE),m=E(t.ellipsoid,w.default),s=E(t.rotation,0);if(!S(e))throw new N("rectangle is required.");if(b.validate(e),e.north<e.south)throw new N("options.rectangle.north must be greater than options.rectangle.south");let h=E(t.height,0),a=E(t.extrudedHeight,h);this._rectangle=b.clone(e),this._granularity=i,this._ellipsoid=m,this._surfaceHeight=Math.max(h,a),this._rotation=s,this._extrudedHeight=Math.min(h,a),this._offsetAttribute=t.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}L.packedLength=b.packedLength+w.packedLength+5;L.pack=function(t,e,i){if(!S(t))throw new N("value is required");if(!S(e))throw new N("array is required");return i=E(i,0),b.pack(t._rectangle,e,i),i+=b.packedLength,w.pack(t._ellipsoid,e,i),i+=w.packedLength,e[i++]=t._granularity,e[i++]=t._surfaceHeight,e[i++]=t._rotation,e[i++]=t._extrudedHeight,e[i]=E(t._offsetAttribute,-1),e};var V=new b,J=w.clone(w.UNIT_SPHERE),k={rectangle:V,ellipsoid:J,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};L.unpack=function(t,e,i){if(!S(t))throw new N("array is required");e=E(e,0);let m=b.unpack(t,e,V);e+=b.packedLength;let s=w.unpack(t,e,J);e+=w.packedLength;let h=t[e++],a=t[e++],_=t[e++],A=t[e++],o=t[e];return S(i)?(i._rectangle=b.clone(m,i._rectangle),i._ellipsoid=w.clone(s,i._ellipsoid),i._surfaceHeight=a,i._rotation=_,i._extrudedHeight=A,i._offsetAttribute=o===-1?void 0:o,i):(k.granularity=h,k.height=a,k.rotation=_,k.extrudedHeight=A,k.offsetAttribute=o===-1?void 0:o,new L(k))};var Z=new M;L.createGeometry=function(t){let e=t._rectangle,i=t._ellipsoid,m=C.computeOptions(e,t._granularity,t._rotation,0,W,Z),s,h;if(P.equalsEpsilon(e.north,e.south,P.EPSILON10)||P.equalsEpsilon(e.east,e.west,P.EPSILON10))return;let a=t._surfaceHeight,_=t._extrudedHeight,A=!P.equalsEpsilon(a,_,0,P.EPSILON2),o;if(A){if(s=X(t,m),S(t._offsetAttribute)){let l=s.attributes.position.values.length/3,f=new Uint8Array(l);t._offsetAttribute===v.TOP?f=f.fill(1,0,l/2):(o=t._offsetAttribute===v.NONE?0:1,f=f.fill(o)),s.attributes.applyOffset=new y({componentDatatype:T.UNSIGNED_BYTE,componentsPerAttribute:1,values:f})}let g=R.fromRectangle3D(e,i,a,K),n=R.fromRectangle3D(e,i,_,j);h=R.union(g,n)}else{if(s=F(t,m),s.attributes.position.values=z.scaleToGeodeticHeight(s.attributes.position.values,a,i,!1),S(t._offsetAttribute)){let g=s.attributes.position.values.length;o=t._offsetAttribute===v.NONE?0:1;let n=new Uint8Array(g/3).fill(o);s.attributes.applyOffset=new y({componentDatatype:T.UNSIGNED_BYTE,componentsPerAttribute:1,values:n})}h=R.fromRectangle3D(e,i,a)}return new q({attributes:s.attributes,indices:s.indices,primitiveType:B.LINES,boundingSphere:h,offsetAttribute:t._offsetAttribute})};var x=L;function $(t,e){return S(e)&&(t=x.unpack(t,e)),t._ellipsoid=w.clone(t._ellipsoid),t._rectangle=b.clone(t._rectangle),x.createGeometry(t)}var Et=$;export{Et as default};
