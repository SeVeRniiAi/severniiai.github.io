var LS="lp2",$=function(i){return document.getElementById(i)};
function key(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)}
var S={name:"You",xp:0,streak:0,last:"",start:"",tasks:{},quiz:{},log:{}};
try{var r=JSON.parse(localStorage.getItem(LS));if(r)for(var k in r)S[k]=r[k]}catch(e){}
if(!S.start)S.start=key(new Date());
function save(){try{localStorage.setItem(LS,JSON.stringify(S))}catch(e){}}
save();
function d0(s){return new Date(s+"T00:00:00")}
function dateOf(n){var d=d0(S.start);d.setDate(d.getDate()+n-1);return d}
function fmt(d){return d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}
function todayNum(){var t=d0(key(new Date()));return Math.round((t-d0(S.start))/864e5)+1}
function addXP(n){var t=key(new Date());S.xp=Math.max(0,S.xp+n);S.log[t]=Math.max(0,(S.log[t]||0)+n);
if(n>0&&S.last!==t){var y=new Date(Date.now()-864e5);S.streak=S.last===key(y)?S.streak+1:1;S.last=t}save()}
function weekXP(){var s=0;for(var i=0;i<7;i++){var d=new Date(Date.now()-i*864e5);s+=S.log[key(d)]||0}return s}
var DAYS={
1:{t:"Listening: form completion",l:"In Section 1 you usually fill in a form. Listen for spelling, numbers and dates. Common trap: the speaker corrects themselves, so write only the final answer.",
tasks:[["Read the lesson (2 min)",10],["Listen to one Section 1 recording and fill in the form",30],["Write 5 new words in your notebook",15]],
quiz:[{q:"The speaker says: “Sorry, it is 14, not 40.” What do you write?",o:["14","40","Both"],a:0},{q:"How many sections does IELTS Listening have?",o:["2","4","6"],a:1}]},
2:{t:"Vocabulary: collocations",l:"Learn words in pairs, not alone: make a decision, take a risk, heavy traffic. Collocations make your speaking and writing sound natural.",
tasks:[["Learn 8 academic words",20],["Use 3 of them in your own sentences",25],["Quiz a friend on 3 words",20]],
quiz:[{q:"Which collocation is correct?",o:["make a decision","do a decision","build a decision"],a:0},{q:"“Significant” is closest to…",o:["tiny","important","old"],a:1}]},
3:{t:"Writing Task 2: structure",l:"Use 4 paragraphs: introduction, two body paragraphs, conclusion. One main idea per body paragraph, supported by an example.",
tasks:[["Write an introduction paragraph (3 sentences)",30],["Plan a full essay in 5 minutes",25],["Join the live quiz night in Telegram",30]],
quiz:[{q:"Minimum words for Writing Task 2?",o:["150","250","350"],a:1},{q:"Suggested time for Task 2?",o:["20 min","40 min","60 min"],a:1}]}};
var EV={3:"Live quiz night",7:"Weekly mock test",14:"Speaking battle",21:"Writing clinic",28:"Final tournament"};
var BOARD=[["Alina",1240,310],["Dmitry",1105,260],["Sofia",980,240],["Max",870,190],["Aigerim",760,170],["Timur",640,120],["Dana",520,95],["Ilya",410,60],["Mira",300,40]];
function ranking(m){var a=BOARD.map(function(b){return{n:b[0],x:m=="week"?b[2]:b[1]}});a.push({n:S.name||"You",x:m=="week"?weekXP():S.xp,me:1});return a.sort(function(p,q){return q.x-p.x||(q.me?1:-1)})}
function myRank(m){var a=ranking(m);for(var i=0;i<a.length;i++)if(a[i].me)return i+1}
function dayDone(n){return !!DAYS[n]&&(S.tasks["d"+n]||[]).length==DAYS[n].tasks.length}
function stats(){var t=0,q=0,d=0;for(var k in S.tasks)t+=S.tasks[k].length;for(var j in S.quiz)if(S.quiz[j].ok)q++;for(var n in DAYS)if(dayDone(+n))d++;return{tasks:t,quiz:q,days:d}}
function nav(a){var L=[["index","Home"],["profile","Profile"],["tasks","Tasks"],["plan","Marathon plan"],["leaderboard","Leaderboard"]];
$("nav").innerHTML='<a class="logo" href="index.html"><span class="mark">BQ</span><span class="lk"><span class="lt">IDP Band Quest</span><span class="ls">IELTS MARATHON</span></span></a>'+L.map(function(l){return'<a href="'+l[0]+'.html"'+(l[0]==a?' class="on"':'')+'>'+l[1]+'</a>'}).join("")+'<a class="btn" href="index.html#auth">Log in</a>';
if(!document.querySelector(".site-foot")){var f=document.createElement("footer");f.className="site-foot";
f.innerHTML='<div class="fin"><div><b>IDP Band Quest</b><p>A digital community where learning meets play. Study, compete and grow with other IELTS learners.</p></div><div><b>Explore</b><a href="profile.html">Profile</a><a href="tasks.html">Tasks</a><a href="plan.html">Marathon plan</a><a href="leaderboard.html">Leaderboard</a></div><div><b>Account</b><a href="index.html#auth">Log in</a><a href="index.html#auth">Sign up</a><a href="index.html#strategy">Strategy</a></div><div class="copy">© 2026 IDP Band Quest · Hackathon prototype · Demo data only</div></div>';document.body.appendChild(f)}}
