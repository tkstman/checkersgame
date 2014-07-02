


window.onload= function()
{
    
    /*create board outline*/
    var board = $("#board");
    var countClasses=0;
    var movesForPlayer1 = { 
                            ".0":[".4",".5"],".1":[".5",".6"],".2":[".6",".7"],
                            ".3":[".7"],".4":[".8",".0"],".5":[".1",".0",".8",".9"],".6":[".2",".1",".9",
                            ".10"],".7":[".10",".11",".2",".3"],".8":[".12",".13",".4",".5"],".9":[".13",".14",".5",".6"],
                            ".10":[".14",".15",".6",".7"],".11":[".15",".7"],".12":[".16",".8"],".13":[".16",".17",".8",".9"],
                            ".14":[".17",".18",".9",".10"],".15":[".18",".19",".10",".11"],".16":[".20",".21",".12",".13"],
                            ".17":[".21",".22",".13",".14"],".18":[".22",".23",".14",".15"],".19":[".23",".15"],
                            ".20":[".24",".16"],".21":[".24",".25",".16",".17"],".22":[".25",".26",".17",".18"],
                            ".23":[".26",".27",".18",".19"],".24":[".28",".29",".20",".21"],".25":[".29",".30",".21",".22"],
                            ".26":[".30",".31",".23",".22"],".27":[".23",".31"],".28":[".24"],".29":[".24",".25"],
                            ".30":[".25",".26"],".31":[".26",".27"]
                          } ;
    var playerToMove;
    var previouslySelectedPlayer= false;
    var key=null;
    //$("#board").addClass("board");
    
    board.css("background-color","blue");
    board.css('height',"400px");
    board.css('width',"400px");
    
    /*create player places*/
    
    var createBlackPanel = function()
    {
        var blackpanel = $("<div>");
        board.append(blackpanel);
        blackpanel.addClass(""+countClasses + " blackpanel");
    };
    
    var createRedPanel = function()
    {
        var redpanel = $("<div>");
        board.append(redpanel);
        redpanel.addClass("redpanel");
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
    var playerClass = { height: '40px', width: '40px', borderRadius:'20px', position: 'relative', 
                        marginTop: '5px', marginLeft:'5px', zIndex:'5'};
    
    
    
    
    
    var removeSelected= function()
    {
        previouslySelectedPlayer.removeClass("selected");
        
        //get the class value on the parent black div of the player
        var key = previouslySelectedPlayer.parent().attr("class").split(' ')[0];
        
            //get the available moves for this class
        var arry = movesForPlayer1["."+key];
        
            //removes the glow from each of the panels which correspond to the available moves
        for(var i=0; i<arry.length;i++)
        {
            if($(arry[i]).hasClass('glow'))
            {
                $(arry[i]).unbind("click");//glowFunction);
                $(arry[i]).removeClass("glow");
            }
        }
    };
    
    var glowFunction = function()//, moveTo)
    {
        previouslySelectedPlayer.parent().removeClass("occu");

        removeSelected();
        previouslySelectedPlayer.remove();
        previouslySelectedPlayer= false;
        
        //alert(this);
        //alert($(this).attr('class'));
        playerToMove.addClass("clickable");
        var tempBlackPanel = $("."+this.classList[0]);
        tempBlackPanel.addClass("occu");
        tempBlackPanel.append(playerToMove);
        playerToMove.on("click",selectedPlayerMoves);
      
    };
    
    /**
     * Display the selected player and its available moves 
     **/
    var selectedPlayerMoves = function(e)
    {
        if(previouslySelectedPlayer === false)
        {
            previouslySelectedPlayer = $(this);
        }
        else
        {
            removeSelected();
            previouslySelectedPlayer=$(this);
        }
        
        playerToMove= $(this);
        //alert(playerToMove);
        playerToMove.addClass("selected");
        
        //get the class value on the parent black div of the player
        key = playerToMove.parent().attr("class").split(' ')[0];
        
            //get the available moves for this class
        var arry = movesForPlayer1["."+key];
        alert(arry);
            //adds the glow to each of the panels which correspond to the available moves
        for(var i=0; i<arry.length;i++)
        {
            var parsedClass = parseInt(arry[i].substring(1), 10);
            var parsedKey = parseInt(key, 10);
            
            if( ( (playerToMove.hasClass("player1")) && (parsedClass > parsedKey) ) 
                 || ( (playerToMove.hasClass("player2")) && (parsedClass < parsedKey) ) )
            {
                if($(arry[i]).hasClass('occu'))
                {
                    if(playerToMove.hasClass("player1"))
                    {
                        if( $(arry[i]).children().hasClass('player2') )
                        {
                            //alert( $(arry[i]).children().attr("class") );
                            var parsedTakablePlayer = parseInt($(arry[i]).attr("class").split(' ')[0],10);
                            
                            alert( "parsed takable is "+parsedTakablePlayer );
                            alert("parsed key "+ parsedKey);
                            alert(movesForPlayer1[".32"]);
                            alert(movesForPlayer1[".31"]);
                            if( parsedTakablePlayer > parsedKey)
                            {
                                alert("one is greater that the other");
                                alert(parsedTakablePlayer-parsedKey);
                                if(parsedTakablePlayer-parsedKey ===4 && (parsedTakablePlayer+3 <32))
                                {
                                    parsedTakablePlayer=parsedTakablePlayer+3;
                                    alert("it got here");
                                    //alert(parsedTakablePlayer);
                                    if ($("."+(parsedTakablePlayer)).hasClass("occu"))
                                    {
                                        alert("went in");
                                    }
                                    else
                                    {
                                        //alert("glow should appear");
                                        $("."+parsedTakablePlayer).addClass("glow");
                                        $("."+parsedTakablePlayer).bind("click",glowFunction);
                                    }
                                }
                                if(parsedTakablePlayer-parsedKey ===3 && (parsedTakablePlayer+4 <32))
                                {
                                    parsedTakablePlayer=parsedTakablePlayer+4;
                                    alert("it got here");
                                    //alert(parsedTakablePlayer);
                                    if ($("."+(parsedTakablePlayer)).hasClass("occu"))
                                    {
                                        alert("went in");
                                    }
                                    else
                                    {
                                        //alert("glow should appear");
                                        $("."+parsedTakablePlayer).addClass("glow");
                                        $("."+parsedTakablePlayer).bind("click",glowFunction);
                                    }
                                }
                                 if(parsedTakablePlayer-parsedKey ===5 && (parsedTakablePlayer+4 <32))
                                {
                                    parsedTakablePlayer=parsedTakablePlayer+4;
                                    alert("its second");
                                    //alert(parsedTakablePlayer);
                                    if ($("."+(parsedTakablePlayer)).hasClass("occu"))
                                    {
                                        //alert("went in second");
                                    }
                                    else
                                    {
                                        //alert("glow should appear second");
                                        $("."+parsedTakablePlayer).addClass("glow");
                                        $("."+parsedTakablePlayer).bind("click",glowFunction);
                                    }
                                }
                            }
                        }
                        
                    }
                    else if(playerToMove.hasClass("player2"))
                    {
                        if( $(arry[i]).children().hasClass('player1') )
                        {
                            //alert( $(arry[i]).children().attr("class") );
                            //alert( $(arry[i]).attr("class") );
                        }
                        
                    }
                }
                else
                {
                    $(arry[i]).addClass("glow");
                    $(arry[i]).bind("click",glowFunction);//glowFunction);
                }
            }
        }
            
    };
    
    while(playerCount > 0)
    {
    
        if(playerCount >40 || playerCount <26)
        {
            /***
                    creates the players for the game
            ***/
            var playerDiv = $('<div>');
            playerDiv.css(playerClass);
            if(playerCount>40)
            {
                playerDiv.addClass("player1");
            }
            else if(playerCount <26)
            {
                playerDiv.addClass("player2");
            }
            
            /***
             * Makes each player clickable
            ***/
            
            playerDiv.addClass("clickable");
            $("."+counter).append(playerDiv);
            
            //indicate that the black panel is occupied
            $("."+counter).addClass("occu");
        }
           $('#try').css(playerClass);
        playerCount=playerCount-2;
        counter++;
    }
    $(".clickable").on("click",selectedPlayerMoves);
    //alert("yo");
    
    
};