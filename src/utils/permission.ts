
import type {Directive} from 'vue'
 
//mock后台返回的数据
const permission = [
    'user:edit',
    'user:create',
]
const vHasShow:Directive<HTMLElement,string> = (el,bingding) => {
   if(!permission.includes(bingding.value)){
       el.style.display = 'none'
   }
}

export {
    vHasShow
}