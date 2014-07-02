window.onload= function()
{
    /*create board outline*/
    var board = $("#board");
    var countClasses=0;
    var movesForPlayer1 = { 
                            ".0":[".4",".5"],".1":[".5",".6"],".2":[".6",".7"],
                            ".3":[".7"],".4":[".8"],".5":[".8",".9"],".6":[".9",
                            ".10"],".7":[".10",".11"],".8":[".12",".13"],".9":[".13",".14"],
                            ".10":[".14",".15"],".11":[".15"],".12":[".16"],".13":[".16",".17"],
                            ".14":[".17",".18"],".15":[".18",".19"],".16":[".20",".21"],
                            ".17":[".21",".22"],".18":[".22",".23"],".19":[".23"],".20":[".24"],
                            ".21":[".24",".25"],".22":[".25",".26"],".23":[".26",".27"],
                            ".24":[".28",".29"],".25":[".29",".30"],".26":[".30",".31"]
                          } ;
    //$("#board").addClass("board");
    
    board.css("background-color","blue");
    board.css('height',"400px");
    board.css('width',"400px");
    
    /*create player places*/
    
    var createBlackPanel = function()
    {
        var blackpanel = $("<div>");
        blackpanel.css('height',"50px");
        blackpanel.css('width',"50px");
        blackpanel.css("background-color","black");
        blackpanel.css('float',"left");
        board.append(blackpanel);
        blackpanel.addClass(""+countClasses);
    };
    
    var createRedPanel = function()
    {
        var redpanel = $("<div>");
        redpanel.css('height',"50px");
        redpanel.css('width',"50px");
        redpanel.css("background-color","red");
        redpanel.css('float',"left");
        board.append(redpanel);
    };
    
    /*produce a board like display of the panels*/
    var boardSize=64;
    while(boardSize > 0)
    {
        if(boardSize>56 || (boardSize<50 && boardSize >40) || (boardSize<34 && boardSize >24) || (boardSize<18 && boardSize >8) )
        {
            createRedPanel();
            createBlackPanel();
        }
        else
        {
            createBlackPanel();
            createRedPanel();
        }
        boardSize=boardSize-2;
        countClasses++;
    }
    
    /*defining the players for game*/
    var playerCount = 64;
    var counter=0;
    var playerClass = {backgroundColor: 'pink', height: '40px', width: '40px', borderRadius:'20px', position: 'relative', 
                        marginTop: '5px', marginLeft:'5px', zIndex:'5'};
    
    var theGlow = 
    {
            
        width: '40px',
        height: '40px',
        backgroundColor: 'yellow',
        boxShadow: '2px 2px 2px 2px #FFD700',
        zIndex: '4',
        position:'absolute',
        top:'1px',
        left:'1px',
        
    };
    
    var glowDiv = $('<div>');
    glowDiv.css(theGlow);
    
    while(playerCount > 0)
    {
    
        if(playerCount >40 || playerCount <26)
        {
            var playerDiv = $('<div>');
            playerDiv.css(playerClass);
            playerDiv.click(function()
                {
                    alert("hey");
                    alert(this);
                    //alert
                    var key = $(this).parent().attr("class");
                    alert(movesForPlayer1["."+key]);
                    var arry = movesForPlayer1["."+key];
                    alert("this is the type of: ",typeof(arry));
                    for(var i=0; i<arry.length;i++)
                    {
                        alert(arry[i]);
                        alert($(arry[i]));
                        //$(arry[i]).children().addClass("glow");
                        $(arry[i]).children().append(glowDiv);
                        //$(arry[i]).children().css("border","2px solid #0000FF");
                    }
                    
                });
            $("."+counter).append(playerDiv);
        }
           $('#try').css(playerClass);
        playerCount=playerCount-2;
        counter++;
  
    }
};