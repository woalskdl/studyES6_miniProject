class Blog{
    constructor() {
        console.log("Blog is started!");
        this.setInitVar();
        this.registerEvents();
        this.likedSet = new Set();
    }

    setInitVar(){
        this.blogList = document.querySelector(".blogList > ul");
    }

    registerEvents(){
        const startBtn = document.querySelector(".start");
        const dataUrl = "/data/data.json"

        startBtn.addEventListener("click", () => {
            this.setInitData(dataUrl);
        });

        this.blogList.addEventListener("click", ({target}) => {
            const targetClassName = target.className;
            if(targetClassName !== "like" && targetClassName !== "unlike") return;

            const postTitle = target.previousElementSibling.textContent;

            if(targetClassName === "unlike"){
                target.className = "like";
                target.innerText = "찜하기";

                this.likedSet.delete(postTitle);
            }else{
                target.className = "unlike";
                target.innerText = "찜하기 취소";

                this.likedSet.add(postTitle);
            }

            this.updateLikedList();
        });
    }

    updateLikedList(){
        const ul = document.querySelector(".like-list > ul");
        let likedSum = "";

        // li 태그에 찜 리스트를 넣고 한번의 innerHTML 을 사용한다.
        this.likedSet.forEach((v) => {
            likedSum += `<li>${v}</li>`;
        })

        ul.innerHTML = likedSum
    }

    setInitData(dataUrl){
        this.getData(dataUrl, this.insertPost.bind(this));
        // do something...
    }

    getData(dataUrl, fn){
        const oReq = new XMLHttpRequest();

        oReq.addEventListener("load", () => {
            const list = JSON.parse(oReq.responseText).body;
            fn(list);
            console.log('list is ', list)
        });

        oReq.open('GET', dataUrl);
        oReq.send();
    }

    insertPost(list){
        list.forEach((v) => {
            this.blogList.innerHTML += `
                <li>
                 <a href = ${v.link}> ${v.title} </a>
                 <div class="like">찜하기</div> 
                </li>
            `;
        })
    }
}

export default Blog;