{
   function myScript(thisObj){
      function myScript_buildUI(thisObj){
         var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Dockable Script", undefined, {resizeable:true, closeButton: false});

         res = "group{orientation:'column',\
                        groupOne: Group{orientation:'row',\
                        createCompButton: Button{text:'Create Comp'},\
               },\
               groupTwo: Panel{orientation:'row',\
                        deleteCompButton: Button{text:'-'},\
                        deleteText: StaticText{text:'Delete Active Comp'},\
               },\
               groupThree: Group{orientation:'row',\
               closeButton: Button{text:'Close'},\
               },\
         }";

         myPanel.grp = myPanel.add(res);

         //Defaults
         myPanel.grp.groupTwo.deleteCompButton.size = [25, 25];
         
         myPanel.grp.groupOne.createCompButton.onClick = function() {
             createComp();
             }
   
        myPanel.grp.groupTwo.deleteCompButton.onClick = function() {
             if(app.project.activeItem == undefined || app.project.activeItem == null) {
                    alert("Please select a comp to delete");
                    return false;
                 }
             else {
                    deleteActiveComp(app.project.activeItem);
                 }
            }
         
        myPanel.grp.groupThree.closeButton.onClick = function() {
            myPanel.close();
            }
    
         
         myPanel.layout.layout(true);

         return myPanel;
      }
   
   
      var myScriptPal = myScript_buildUI(thisObj);

      if (myScriptPal != null && myScriptPal instanceof Window){
         myScriptPal.center();
         myScriptPal.show();
      }

   }
   myScript(this);
}

function createComp() {
    app.project.items.addComp("New Composition", 1920, 1080, 1, 10, 30);
    }

function deleteActiveComp(comp) {
    comp.remove();
    }