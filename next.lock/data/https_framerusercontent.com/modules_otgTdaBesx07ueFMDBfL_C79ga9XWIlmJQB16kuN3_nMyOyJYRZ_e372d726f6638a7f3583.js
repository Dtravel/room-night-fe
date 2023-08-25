// Generated by Framer (f1edf09)
import{jsx as _jsx,jsxs as _jsxs}from"react/jsx-runtime";import{addFonts,addPropertyControls,ControlType,cx,getFonts,getPropertyControls,RichText,useVariantState,withCSS}from"framer";import{LayoutGroup,motion}from"framer-motion";import*as React from"react";import{Icon as Feather}from"https://framerusercontent.com/modules/f0DboytQenYh21kfme7W/zb1zVBMZJKgPMiedOi0y/Feather.js";const FeatherFonts=getFonts(Feather);const FeatherControls=getPropertyControls(Feather);const enabledGestures={aQAAigURI:{hover:true}};const cycleOrder=["aQAAigURI"];const variantClassNames={aQAAigURI:"framer-v-1ja59ol"};function addPropertyOverrides(overrides,...variants){const nextOverrides={};variants===null||variants===void 0?void 0:variants.forEach(variant=>variant&&Object.assign(nextOverrides,overrides[variant]));return nextOverrides;}const humanReadableVariantMap={};const transitions={default:{damping:60,delay:0,duration:.3,ease:[.44,0,.56,1],mass:1,stiffness:500,type:"spring"}};const Component=/*#__PURE__*/ React.forwardRef(function({id,style,className,width,height,layoutId,variant:outerVariant="aQAAigURI",title:Zry05mmcJ="text",name:qSKCKZeRL="map-pin",...restProps},ref){const outerVariantId=humanReadableVariantMap[outerVariant];const variant=outerVariantId||outerVariant;const{baseVariant,classNames,gestureVariant,setGestureState,setVariant,transition,variants}=useVariantState({cycleOrder,defaultVariant:"aQAAigURI",enabledGestures,transitions,variant,variantClassNames});const layoutDependency=variants.join("-")+restProps.layoutDependency;const defaultLayoutId=React.useId();return /*#__PURE__*/ _jsx(LayoutGroup,{id:layoutId!==null&&layoutId!==void 0?layoutId:defaultLayoutId,children:/*#__PURE__*/ _jsx(motion.div,{initial:variant,animate:variants,onHoverStart:()=>setGestureState({isHovered:true}),onHoverEnd:()=>setGestureState({isHovered:false}),onTapStart:()=>setGestureState({isPressed:true}),onTap:()=>setGestureState({isPressed:false}),onTapCancel:()=>setGestureState({isPressed:false}),className:cx("framer-ikcHa",classNames),style:{display:"contents"},children:/*#__PURE__*/ _jsxs(motion.div,{...restProps,className:cx("framer-1ja59ol",className),"data-border":true,"data-framer-name":"Variant 1",layoutDependency:layoutDependency,layoutId:"aQAAigURI",ref:ref,style:{"--border-bottom-width":"1px","--border-color":"rgba(255, 255, 255, 0.15)","--border-left-width":"1px","--border-right-width":"1px","--border-style":"solid","--border-top-width":"1px",backgroundColor:"rgba(255, 255, 255, 0.04)",...style},transition:transition,variants:{"aQAAigURI-hover":{"--border-color":"rgba(255, 255, 255, 0.2)",backgroundColor:"rgba(255, 255, 255, 0.08)"}},...addPropertyOverrides({"aQAAigURI-hover":{"data-framer-name":undefined}},baseVariant,gestureVariant),children:[/*#__PURE__*/ _jsx(motion.div,{className:"framer-jrmzdr-container",layoutDependency:layoutDependency,layoutId:"CVbMDh1zv-container",style:{opacity:.5},transition:transition,variants:{"aQAAigURI-hover":{opacity:1}},children:/*#__PURE__*/ _jsx(Feather,{color:"rgb(255, 255, 255)",height:"100%",iconSearch:"pin",iconSelection:qSKCKZeRL,id:"CVbMDh1zv",layoutId:"CVbMDh1zv",mirrored:false,selectByList:true,style:{height:"100%",width:"100%"},width:"100%"})}),/*#__PURE__*/ _jsx(RichText,{__fromCanvasComponent:true,children:/*#__PURE__*/ _jsx(React.Fragment,{children:/*#__PURE__*/ _jsx(motion.p,{style:{"--font-selector":"R0Y7SW50ZXItNTAw","--framer-font-size":"14px","--framer-font-weight":"500","--framer-letter-spacing":"-0.2px","--framer-line-height":"14px","--framer-text-alignment":"left","--framer-text-color":"var(--extracted-r6o4lv)"},children:"text"})}),className:"framer-14ow27y",fonts:["GF;Inter-500"],layoutDependency:layoutDependency,layoutId:"zFTK2rwrA",style:{"--extracted-r6o4lv":"rgb(255, 255, 255)","--framer-paragraph-spacing":"0px"},text:Zry05mmcJ,transition:transition,verticalAlignment:"top",withExternalLayout:true})]})})});});const css=['.framer-ikcHa [data-border="true"]::after { content: ""; border-width: var(--border-top-width, 0) var(--border-right-width, 0) var(--border-bottom-width, 0) var(--border-left-width, 0); border-color: var(--border-color, none); border-style: var(--border-style, none); width: 100%; height: 100%; position: absolute; box-sizing: border-box; left: 0; top: 0; border-radius: inherit; pointer-events: none; }',"@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }",".framer-ikcHa * { box-sizing: border-box; }",".framer-ikcHa .framer-16p3e4 { display: block; }",".framer-ikcHa .framer-1ja59ol { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 12px; height: 48px; justify-content: center; overflow: hidden; padding: 0px 16px 0px 16px; position: relative; width: 433px; }",".framer-ikcHa .framer-jrmzdr-container { flex: none; height: 20px; position: relative; width: 16px; }",".framer-ikcHa .framer-14ow27y { flex: 1 0 0px; height: auto; position: relative; white-space: pre-wrap; width: 1px; word-break: break-word; word-wrap: break-word; }",".framer-ikcHa .framer-v-1ja59ol .framer-1ja59ol { cursor: pointer; }","@supports (background: -webkit-named-image(i)) and (not (font-palette:dark)) { .framer-ikcHa .framer-1ja59ol { gap: 0px; } .framer-ikcHa .framer-1ja59ol > * { margin: 0px; margin-left: calc(12px / 2); margin-right: calc(12px / 2); } .framer-ikcHa .framer-1ja59ol > :first-child { margin-left: 0px; } .framer-ikcHa .framer-1ja59ol > :last-child { margin-right: 0px; } }"];/**
 * This is a generated Framer component.
 * @framerIntrinsicHeight 48
 * @framerIntrinsicWidth 433
 * @framerCanvasComponentVariantDetails {"propertyName":"variant","data":{"default":{"layout":["fixed","fixed"]},"ANdW5UOvx":{"layout":["fixed","fixed"]}}}
 * @framerVariables {"Zry05mmcJ":"title","qSKCKZeRL":"name"}
 */ const FramernMyOyJYRZ=withCSS(Component,css,"framer-ikcHa");export default FramernMyOyJYRZ;FramernMyOyJYRZ.displayName="Dropdown Copy";FramernMyOyJYRZ.defaultProps={height:48,width:433};addPropertyControls(FramernMyOyJYRZ,{Zry05mmcJ:{defaultValue:"text",displayTextArea:false,title:"Title",type:ControlType.String},qSKCKZeRL:(FeatherControls===null||FeatherControls===void 0?void 0:FeatherControls["iconSelection"])&&{...FeatherControls["iconSelection"],defaultValue:"map-pin",hidden:undefined,title:"Name"}});addFonts(FramernMyOyJYRZ,[{family:"Inter",moduleAsset:{localModuleIdentifier:"local-module:canvasComponent/nMyOyJYRZ:default",url:"https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf"},style:"normal",url:"https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",weight:"500"},...FeatherFonts]);
export const __FramerMetadata__ = {"exports":{"default":{"type":"reactComponent","name":"FramernMyOyJYRZ","slots":[],"annotations":{"framerIntrinsicHeight":"48","framerContractVersion":"1","framerCanvasComponentVariantDetails":"{\"propertyName\":\"variant\",\"data\":{\"default\":{\"layout\":[\"fixed\",\"fixed\"]},\"ANdW5UOvx\":{\"layout\":[\"fixed\",\"fixed\"]}}}","framerVariables":"{\"Zry05mmcJ\":\"title\",\"qSKCKZeRL\":\"name\"}","framerIntrinsicWidth":"433"}},"Props":{"type":"tsType","annotations":{"framerContractVersion":"1"}},"__FramerMetadata__":{"type":"variable"}}}
//# sourceMappingURL=./nMyOyJYRZ.map