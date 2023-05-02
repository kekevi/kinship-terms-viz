{
  const node_width = 250;
  const node_height = 120;
  const padding = 20;
  const rounding = 15;
  // const sexless_color = ;
  const male_color = '#67A3D9';
  const female_color = '#f296ad';

  FamilyTree.templates.myTemplate = Object.assign({}, FamilyTree.templates.base);
  FamilyTree.templates.myTemplate.defs = `<style>
                                      .{randId} .bft-edit-form-header, .{randId} .bft-img-button{
                                          background-color: #aeaeae;
                                      }
                                      .{randId}.male .bft-edit-form-header, .{randId}.male .bft-img-button{
                                          background-color: #039BE5;
                                      }        
                                      .{randId}.male div.bft-img-button:hover{
                                          background-color: #F57C00;
                                      }
                                      .{randId}.female .bft-edit-form-header, .{randId}.female .bft-img-button{
                                          background-color: #F57C00;
                                      }        
                                      .{randId}.female div.bft-img-button:hover{
                                          background-color: #039BE5;
                                      }
                                      .node-text {
                                        font-size: 18px;
                                        text-align: center; 
                                        display: flex; 
                                        align-items: center; 
                                        height: 100%; 
                                        justify-content: center;
                                        font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;

                                      }
  </style>`;
  FamilyTree.templates.myTemplate.field_0 = 
    `<foreignObject ${FamilyTree.attr.width}="${node_width - padding}" x="${padding/2}" y="${padding/2}" width="${node_width - padding}" height="${node_height - padding}" text-anchor="start">
      <div xmlns="http://www.w3.org/1999/xhtml" class="node-text" color="#abf042">
        {val}
      </div>
    </foreignObject>`;
  FamilyTree.templates.myTemplate.field_1 = 
    '<text ' + FamilyTree.attr.width + ' ="150" style="font-size: 14px;" fill="#ffffff" x="10" y="65" text-anchor="start">{val}</text>';
  FamilyTree.templates.myTemplate.node = `<rect x="0" y="0" height="${node_height}" width="${node_width}" stroke-width="1" fill="#aeaeae" stroke="#aeaeae" rx="${rounding}" ry="${rounding}"></rect>`;
  FamilyTree.templates.myTemplate_male = Object.assign({}, FamilyTree.templates.myTemplate);
  FamilyTree.templates.myTemplate_male.node = `<rect x="0" y="0" height="${node_height}" width="${node_width}" stroke-width="1" fill="${male_color}" stroke="#aeaeae" rx="${rounding}" ry="${rounding}"></rect>`;
  FamilyTree.templates.myTemplate_female = Object.assign({}, FamilyTree.templates.myTemplate);
  FamilyTree.templates.myTemplate_female.node = `<rect x="0" y="0" height="${node_height}" width="${node_width}" stroke-width="1" fill="${female_color}" stroke="#aeaeae" rx="${rounding}" ry="${rounding}"></rect>`;
  console.log()
}