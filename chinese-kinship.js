import relationship from "./relationship-1.2.0/src/relationship.js";

export class ChineseKinship {
  getName(path) {
    if (path == '_' || path == '_m' || path == '_f'){
      return "你";
    }
    
    path = path.split('.')
    const root_sex = path.shift()[1] || 'm' // default to male
    const textpath = []
    
    for (const node of path) {
      switch (node) {
        case '+m':
          textpath.push('爸爸')
          break;
        case '-m':
          textpath.push('儿子')
          break;
        case '=m':
        case '>m':
          textpath.push('哥哥') // default to older sibling
        case '<m':
          textpath.push('弟弟')
          break;
        case '~m':
          textpath.push('老公')
          break;
        case '+f':
          textpath.push('妈妈')
          break;
        case '-f':
          textpath.push('女儿')
          break;
        case '=f':
        case '>f':
          textpath.push('姐姐')
        case '<f':
          textpath.push('妹妹')
          break;
        case '~f':
          textpath.push('老婆')
          break;
        default:
          break;
      }
    }

    return relationship({                     // https://github.com/mumuy/relationship/#readme.md translated
      text: textpath.join('的'),		          // text (path): a 1-degree relative term separated by 的
      // target:'',	    	                    // target：who is the root node (if undefined, then root is you)
      sex: root_sex == 'm' ? 1 : 0,			      // sex：sex of root node 0 = female, 1 = male
      type: 'default',		                    // (conversion) type: 'default' = return name of relative, 'chain' = return name ,'pair'计算关系合称
      // reverse: false,		                  // reverse：true = what text calls root, false = what root calls text
      // mode: 'default',		                  // 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
      // optimal: false,                      // 最短关系：计算两者之间的最短关系
    }) || '???'
    
  }
}