const user='X';
const computer='O';
var board;
var boardcells=document.querySelectorAll('.boardcell');
const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]
Start();
function Start()
{
	board = Array.from([0,1,2,3,4,5,6,7,8]);
	for (var i = 0; i <9; i++)
		boardcells[i].addEventListener('click', UserPlay, false);
}
function UserPlay(e)
{
	if(board[e.target.id]!="X"&&board[e.target.id]!="O")
	{
		play(e.target.id,user);
		if(check(board,user)==-1&&!tie())
			play(bestid(board,computer),computer);
	}
}
function emptyids(board)
{
	return  board.filter(s => s != "O" && s != "X");
}
function bestid(board,computer)
{
	console.log(ComputerPlay(board,0,computer));
	return ComputerPlay(board,0,computer).index;
}
function tie()
{
	for(var i=0;i<9;i++)
	{
		if(board[i]!="X"&&board[i]!="O")
			return false;
	}
	for(var i=0;i<9;i++)
	{
		gameover(9,"T");
	}
	return true;
}
function play(id,player)
{
	board[id]=player;
	document.getElementById(id).innerHTML=player;
	let won=check(board,player);
	if(won!=-1)
		gameover(won,player);
}
function check(board,player)
{
	var won=-1;
	if (board[0] == player && board[1] == player && board[2] == player)
		won=0;
	else if (board[3] == player && board[4] == player && board[5] == player)
		won=1;
	else if (board[6] == player && board[7] == player && board[8] == player)
		won=2;
	else if	 (board[0] == player && board[3] == player && board[6] == player)
		won=3;
	else if	 (board[1] == player && board[4] == player && board[7] == player)
		won=4;
	else if	 (board[2] == player && board[5] == player && board[8] == player)
		won=5;
	else if	 (board[0] == player && board[4] == player && board[8] == player)
		won=6;
	else if	 (board[2] == player && board[4] == player && board[6] == player)
		won=7;
	return won;
}
function gameover(won,player)
{
	var color;
	if(player=="X")
		color="rgb(176, 249, 17)";
	else if(player=="O")
		color="rgb(255, 0, 0)";
	else
		color="rgb(0, 101, 255)";
	if(won==9)
	{
		for(var i=0;i<9;i++)
		{
			document.getElementById(i).style.backgroundColor=color;
			boardcells[i].removeEventListener("click",UserPlay,false);
		}
	}
	else
	{
		for(let index of win[won])
			document.getElementById(index).style.backgroundColor=color;
		for(var i=0;i<9;i++)
			boardcells[i].removeEventListener("click",UserPlay,false);
	}
	results(player);
}
function results(player)
{
	var res;
	if(player=="X")
		res="You Win! (LOL You Won't :P)";
	else if(player=="O")
		res="You Lose!";
	else
		res="It's a Draw!";
	document.getElementById("result").style.display = "block";
	document.getElementById("result").innerHTML = res;
}
function ComputerPlay(newboard,depth,player)
{
	var availablespots=emptyids(board);
	if (check(newboard,user)!=-1) 
	{
		return {score: -10+depth};
	} 
	else if (check(newboard, computer)!=-1) 
	{
		return {score: 10-depth};
	} 
	else if (availablespots.length === 0)
	{
		return {score: 0};
	}
	var moves=[];
	for(var i=0;i<availablespots.length;i++)
	{
		var move={};
		move.index=newboard[availablespots[i]];
		newboard[availablespots[i]]=player;
		if(player==computer)
		{
			var result=ComputerPlay(newboard,depth+1,user);
			move.score=result.score;
		}
		else
		{
			var result=ComputerPlay(newboard,depth+1,computer);
			move.score=result.score;
		}
		newboard[availablespots[i]]=move.index;
		moves.push(move);
	}
	var bestmove;
	if(player==computer)
	{
		bestscore=-1000;
		for(var i=0;i<moves.length;i++)
		{
			if(bestscore<moves[i].score)
			{
				bestscore=moves[i].score;
				bestmove=i;
			}
		}
	}
	else 
	{
		bestscore=1000;
		for(var i=0;i<moves.length;i++)
		{
			if(bestscore>moves[i].score)
			{
				bestscore=moves[i].score;
				bestmove=i;
			}
		}
	}
	return moves[bestmove];
}
document.getElementById("restart").addEventListener("click",function(e){ e.preventDefault(); window.location.reload();},false);