(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{101:function(e,t,n){"use strict";n.r(t);var i=n(2),r=n(0),a=n.n(r),c=n(10),s=n.n(c),l=(n(90),n(22)),o=(n(91),n(146)),d=n(147),j=n(134),u=n(145),h=n(143),b=n(76),g=n.n(b),x=n(138);function O(e){return Object(i.jsx)("div",{style:{height:"93vh",width:"100vw"},children:Object(i.jsxs)(j.a,{container:!0,style:{height:"100%"},children:[Object(i.jsx)(v,{buttonName:"Choose your drink",buttonAction:"choose",setScreen:e.setScreen}),Object(i.jsx)(v,{buttonName:"Get favorite",buttonAction:"favorite",setScreen:e.setScreen}),Object(i.jsx)(v,{buttonName:"Get previous",buttonAction:"previous",setScreen:e.setScreen}),Object(i.jsx)(v,{buttonName:"Craft your own",buttonAction:"craft",setScreen:e.setScreen}),Object(i.jsx)(v,{buttonName:"New User",buttonAction:"new",setScreen:e.setScreen})]})})}function v(e){var t=e.buttonName,n=e.buttonAction,r=e.setScreen;return Object(i.jsx)(j.a,{item:!0,xs:12,style:{padding:"5px"},children:Object(i.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){return r(n)},style:{width:"100%",height:"100%"},children:t})})}var y=n(34),f=n(35),m=n(51),p=n(37),C=n(36),w=n(149),k=function(e){Object(p.a)(r,e);var t=Object(C.a)(r);function r(e){var n;return Object(y.a)(this,r),(n=t.call(this,e)).state={value:""},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n}return Object(f.a)(r,[{key:"handleChange",value:function(e){this.setState({value:e.target.value})}},{key:"render",value:function(){var e=n(46);return Object(i.jsx)("div",{style:{width:"100vw"},children:Object(i.jsxs)(j.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center",children:[Object(i.jsx)(j.a,{item:!0,xs:12,children:Object(i.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(i.jsx)(w.a,{id:"standard-basic",label:"Your Name",onChange:this.handleChange,style:{width:"95vw"}})})}),Object(i.jsx)(j.a,{item:!0,xs:12,children:Object(i.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"2%"},children:Object(i.jsx)(e,{value:"n".concat(this.state.value),style:{width:"95vw",height:"95vw"}})})})]})})}}]),r}(a.a.Component),S=n(144),I=n(74),N=n.n(I);function q(e){var t=e.drink,a=e.qr,c=e.allowFavorite,s=n(46),o=Object(r.useState)(!1),d=Object(l.a)(o,2),u=d[0],b=d[1];return c&&console.log("TRUE"),Object(i.jsxs)("div",{style:{width:"100vw"},children:[Object(i.jsxs)(j.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center",children:[Object(i.jsx)(j.a,{item:!0,xs:12,children:Object(i.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(i.jsx)(h.a,{fontWeight:"fontWeightBold",variant:"h4",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:t})})}),Object(i.jsx)(j.a,{item:!0,xs:12,children:Object(i.jsx)("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",padding:"2%"},children:Object(i.jsx)(s,{value:u?"f".concat(a.substring(1,a.length)):a,style:{width:"95vw",height:"95vw"}})})})]}),c&&Object(i.jsx)(S.a,{"aria-label":"like",style:{margin:"10px"},onClick:function(){return b(!u)},children:Object(i.jsx)(N.a,{color:u?"secondary":"default"})})]})}var A=n(62);function F(){var e,t=Object(r.useState)(null),n=Object(l.a)(t,2),a=n[0],c=n[1];return console.log(A),null!=a?Object(i.jsx)(q,{drink:(e=a,e.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" ")),qr:"g".concat(a),allowFavorite:!0}):Object(i.jsx)("div",{style:{width:"100vw"},children:Object(i.jsx)(j.a,{container:!0,children:Object.keys(A).map((function(e){return Object(i.jsx)(B,{drinkName:e,setDrink:c})}))})})}function B(e){var t=e.drinkName,n=e.setDrink;return Object(i.jsx)(j.a,{item:!0,xs:6,style:{padding:"10px",height:"25vh"},children:Object(i.jsx)(x.a,{variant:"contained",color:"primary",onClick:function(){return n(t)},style:{width:"100%",height:"100%"},children:t})})}var L=n(77),W=n(151),D=n(75),U=n.n(D);function J(e){var t=e.setScreen,n=a.a.useState(null),r=Object(l.a)(n,2),c=r[0],s=r[1],o=function(e,n){null!=n&&t(n),s(null)};return Object(i.jsxs)("div",{children:[Object(i.jsx)(u.a,{edge:"start",color:"inherit","aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){s(e.currentTarget)},children:Object(i.jsx)(U.a,{})}),Object(i.jsxs)(L.a,{id:"simple-menu",anchorEl:c,keepMounted:!0,open:Boolean(c),onClose:function(e){return o(0,null)},children:[Object(i.jsx)(W.a,{onClick:function(e){return o(0,"configure")},children:"Configure"}),Object(i.jsx)(W.a,{onClick:function(e){return o(0,"clean")},children:"Clean"}),Object(i.jsx)(W.a,{onClick:function(e){return o(0,null)},children:"by Ben Chuang"})]})]})}var T=n(54),E=n(52),R=n(103),Y=n(141),G=n(148),M=n(152),P=n(44);var Q=function(e){Object(p.a)(r,e);var t=Object(C.a)(r);function r(e){var n;return Object(y.a)(this,r),(n=t.call(this,e)).state={name:"",ingredients:1,ingredient0:"",quantity0:0,ingredient1:"",quantity1:0,ingredient2:"",quantity2:0,ingredient3:"",quantity3:0,ingredient4:"",quantity4:0,ingredient5:"",quantity5:0},n.ingredients=P.sort(),n}return Object(f.a)(r,[{key:"handleChange",value:function(e,t){this.setState(Object(E.a)({},e,t))}},{key:"makeIngredient",value:function(e,t){return Object(i.jsx)(j.a,{item:!0,xs:12,style:{padding:"5px"},children:Object(i.jsxs)(R.a,{elevation:3,children:[Object(i.jsxs)(h.a,{variant:"h6",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:["Ingredient ",e+1]}),Object(i.jsx)("div",{children:Object(i.jsx)(Y.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(i.jsx)(G.a,{style:{minWidth:"50%"},name:"ingredient".concat(e),labelId:"demo-simple-select-label",id:"demo-simple-select",value:this.state["ingredient".concat(e)],onChange:function(e){return t(e.target.name,e.target.value)},autoWidth:!0,min:!0,children:this.ingredients.map((function(e){return Object(i.jsx)(W.a,{value:e,children:(t=e,t.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "))});var t}))})})}),Object(i.jsx)("br",{}),Object(i.jsx)("div",{children:Object(i.jsxs)(Y.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(i.jsx)(h.a,{id:"continuous-slider",gutterBottom:!0,children:"Quantity (10 = ~1 ounce)"}),Object(i.jsx)(M.a,{name:"quantity".concat(e),defaultValue:50,"aria-labelledby":"discrete-slider-custom",valueLabelDisplay:"auto",onChange:function(n,i){return t("quantity".concat(e),i)},style:{width:"75%"}})]})})]})})}},{key:"addIngredient",value:function(){this.state.ingredients<6&&this.setState({ingredients:this.state.ingredients+1})}},{key:"removeIngredient",value:function(){this.state.ingredients>1&&this.setState({ingredients:this.state.ingredients-1})}},{key:"render",value:function(){for(var e=this,t=n(46),r=this.handleChange.bind(this),a=this.addIngredient.bind(this),c=this.removeIngredient.bind(this),s=this.state.name,l=0;l<this.state.ingredients;l++)s+="|"+this.state["ingredient"+l]+":"+this.state["quantity"+l];return Object(i.jsxs)(j.a,{container:!0,justify:"center",children:[Object(i.jsx)(j.a,{item:!0,xs:12,style:{padding:"10px"},children:Object(i.jsxs)(R.a,{elevation:3,children:[Object(i.jsx)(h.a,{variant:"h6",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:"Craft your own!"}),Object(i.jsx)("div",{style:{padding:"10px"},children:Object(i.jsx)(Y.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:Object(i.jsx)(w.a,{id:"standard-basic",label:"Drink name",onChange:function(e){return r("name",e.target.value)}})})})]})}),Object(T.a)(Array(this.state.ingredients).keys()).map((function(t){return e.makeIngredient(t,r)})),Object(i.jsx)(j.a,{item:!0,xs:6,align:"center",style:{padding:"10px"},children:Object(i.jsx)(x.a,{variant:"contained",color:"primary",style:{width:"25%",justifyContent:"center",alignItems:"center"},onClick:a,children:"Add"})}),Object(i.jsx)(j.a,{item:!0,xs:6,align:"center",style:{padding:"10px"},children:Object(i.jsx)(x.a,{variant:"contained",color:"primary",style:{width:"25%"},onClick:c,children:"Remove"})}),Object(i.jsx)(t,{value:"s".concat(s),style:{width:"95vw",height:"95vw"}})]})}}]),r}(a.a.Component),z=n(142);P.unshift("None");var V=function(e){Object(p.a)(r,e);var t=Object(C.a)(r);function r(e){var n;return Object(y.a)(this,r),(n=t.call(this,e)).state={ingredient0:"None",ingredient1:"None",ingredient2:"None",ingredient3:"None",ingredient4:"None",ingredient5:"None"},n.ingredients=P.sort(),n}return Object(f.a)(r,[{key:"handleChange",value:function(e,t){this.setState(Object(E.a)({},e,t))}},{key:"render",value:function(){for(var e=this,t=n(46),r=this.handleChange.bind(this),a="i",c=0;c<6;c++)a+=this.state["ingredient"+c]+"|";return a=a.substring(0,a.length-1),console.log(a),Object(i.jsxs)(j.a,{container:!0,justify:"center",children:[Object(T.a)(Array(6).keys()).map((function(t){return Object(i.jsx)(j.a,{item:!0,xs:12,style:{padding:"10px"},children:Object(i.jsxs)(Y.a,{style:{display:"flex",justifyContent:"center",alignItems:"center"},children:[Object(i.jsx)(G.a,{style:{minWidth:"50%"},name:"ingredient".concat(t),labelId:"demo-simple-select-label",id:"demo-simple-select",value:e.state["ingredient".concat(t)],onChange:function(e){return r(e.target.name,e.target.value)},autoWidth:!0,min:!0,children:e.ingredients.map((function(e){return Object(i.jsx)(W.a,{value:e,children:(t=e,t.toLowerCase().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.substring(1)})).join(" "))});var t}))}),Object(i.jsxs)(z.a,{children:["Ingredient ",t+1]})]})})})),Object(i.jsx)(t,{value:a,style:{width:"95vw",height:"95vw",margin:"10px"}})]})}}]),r}(a.a.Component);function H(e,t){switch(e){case"home":return Object(i.jsx)(O,{setScreen:t});case"new":return Object(i.jsx)(k,{});case"favorite":return Object(i.jsx)(q,{drink:"Your favorite drink",qr:"f"});case"previous":return Object(i.jsx)(q,{drink:"Your previous drink",qr:"p"});case"choose":return Object(i.jsx)(F,{});case"craft":return Object(i.jsx)(Q,{});case"configure":return Object(i.jsx)(V,{});case"clean":return Object(i.jsx)(q,{drink:"Clean",qr:"c"});default:return}}function K(e){var t=e.screen,n=e.setScreen;return Object(i.jsx)(o.a,{position:"static",children:Object(i.jsx)(d.a,{children:Object(i.jsxs)(j.a,{container:!0,direction:"row",justify:"space-between",alignItems:"center",children:[Object(i.jsx)(u.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:function(){return n("home")},disabled:"home"===t,children:Object(i.jsx)(g.a,{})}),Object(i.jsx)(j.a,{item:!0,xs:4,children:Object(i.jsx)(h.a,{variant:"h6",style:{display:"flex",justifyContent:"center",alignItems:"center"},children:"QRtender"})}),Object(i.jsx)(J,{setScreen:n})]})})})}var X=function(){var e=Object(r.useState)("home"),t=Object(l.a)(e,2),n=t[0],a=t[1];return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(K,{screen:n,setScreen:a}),H(n,a)]})},Z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,153)).then((function(t){var n=t.getCLS,i=t.getFID,r=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),i(e),r(e),a(e),c(e)}))};s.a.render(Object(i.jsx)(a.a.StrictMode,{children:Object(i.jsx)(X,{})}),document.getElementById("root")),Z()},44:function(e){e.exports=JSON.parse('["vodka","tequila","orange juice"]')},62:function(e){e.exports=JSON.parse('{"vodka":{"vodka":10},"moscow mule":{"vodka":10,"ginger beer":10},"screwdriver":{"vodka":10,"orange juice":10},"bay breeze":{"vodka":10,"fruit juice":12}}')},90:function(e,t,n){},91:function(e,t,n){}},[[101,1,2]]]);
//# sourceMappingURL=main.dcf5b09e.chunk.js.map