let answer = "";
let shuffled = [];
let draggedLetter = null;
let deskripsi=""
let level


function shuffleWord(word) {
    const letters = word.split("");
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
}
function placeLetter(slot, char) {
    if (!slot.hasClass("filled")) {
        slot.text(char).addClass("filled").attr("data-char", char);
        checkAnswer();
    }
}

function initGame(word,levels,desk=""){
    answer=word;
    deskripsi=desk;
    level=levels
    
    $("#level-title").text("level"+level)

    $("#answerContainer").html("");
    for (let i = 0; i < answer.length; i++) {
        $("#answerContainer").append(`<div class="slot" data-index="${i}"></div>`);
    }
    shuffled=shuffleWord(answer)

    $("#shuffledContainer").html("");
        shuffled.forEach((char, idx) => {
            $("#shuffledContainer").append(`
            <div class="letter" draggable="true" data-index="${idx}" data-char="${char}">
                ${char}
            </div>
        `); 
    });
    initDragDrop()
}
function initDragDrop() {
    let draggedLetter = null;

    $(".letter").each(function () {
        let idx = $(this).data("index");
        $(this).attr("data-char", shuffled[idx]);
    });

    // pilih huruf
    $(".letter").off("click").on("click", function () {
        draggedLetter = $(this);
        $(".letter").removeClass("selected");
        draggedLetter.addClass("selected");
    });

    // pilih slot
    $(".slot").off("click").on("click", function () {
        if($(this).hasClass("filled")){
            return false
        }else{

            if (!draggedLetter) return;
            
            let char = draggedLetter.data("char");
            placeLetter($(this), char);
            
            draggedLetter.removeClass("selected");
            draggedLetter.hide()
            // console.log(draggedLetter)
            draggedLetter = null;
        }

    });
}


function checkAnswer() {
    let current = "";

    $(".slot").each(function () {
        current += $(this).attr("data-char") || "";
    });

    if (current.length === answer.length) {
        if (current === answer) {
            Swal.fire({
                title: 'Leres! 👍',
                text: 'JOS JIS REK!! 🤙🤙🤙🤙🤙',
                icon: 'success',
                confirmButtonText: 'yeey',
                confirmButtonColor: '#4CAF50', // Hijau tema belajar
                background: '#d4edda', // Latar hijau muda
                customClass: {
                    popup: 'swal-wide' // Kelas CSS opsional untuk lebar
                },
                timer: 3000, // Auto tutup setelah 3 detik
                toast: false // Full popup, bukan toast
            }).then(() => {
                // Redirect ke soal baru atau tambah score
                $("#deskripsi").text(deskripsi)
                $("#nextLevel").show()
                let lev=JSON.parse(localStorage.getItem("level"))
                let i=lev.findIndex(item=>item.level===level)
                // console.log(level)
                let next_level=level+1
                // console.log("next level"+next_level)
                let j=lev.findIndex(item=>item.level===next_level)
                lev[i].status="completed";
                // console.log(j)
                if(j>0){
                    lev[j].status="unlocked"
                }
                localStorage.setItem("level",JSON.stringify(lev))

                // console.log(JSON.parse(localStorage.getItem("level")))

            });
        } else {

            Swal.fire({
                title: 'WALAH',
                text: 'kurang bener rek, jajal malih!',
                icon: 'warning',
                confirmButtonText: 'yeey',
                confirmButtonColor: '#4CAF50', // Hijau tema belajar
                background: '#d4edda', // Latar hijau muda
                customClass: {
                    popup: 'swal-wide' // Kelas CSS opsional untuk lebar
                },
                timer: 3000, // Auto tutup setelah 3 detik
                toast: false // Full popup, bukan toast
            }).then(() => {
                initGame(word,level,deskripsi)
            })
        }
    }
}

