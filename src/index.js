import * as request from './request.js'

let data = []
let menu = document.querySelector('.menu')
let close = document.querySelector('.close')
let showDetails = document.querySelector('.show-details')
let activeOrInactiveList = document.querySelectorAll('.active-inactive') //即获取 introduction-page-outer、picture-list-outer、footer

//请求 JSON 数据
async function load() {
  data = await Promise.resolve(request.get('data/task.json'))
  // console.log(data)
}

//创建列表项
function createList() {
  //用于保存 badge 字段值为空的节点下标
  let pos = []
  //获取父节点
  let ul = document.querySelector('.picture-list-inner')
  let fragment = document.createDocumentFragment()
  data.forEach((item, index) => {
    let li = document.createElement('li')
    li.className = 'picture-list-item'
    li.innerHTML = `<div class="picture-cover">
                      <img src=${item.cover} alt="图片未显示">
                    </div>
                    <div class="picture-msg">
                      <div class="user-info">
                        <img src=${item.avatar} alt="" class="user-avatar">
                        <span class="user-name">${item.name}</span>
                        <span class="user-badge">${item.badge}</span>
                      </div>
                        <div class="like-and-view">
                          <img src="./imgs/icon-like.svg" alt="" class="like">
                          ${item.likes}
                          <img src="./imgs/icon-view.svg" alt="" class="view">
                          ${item.views}
                        </div>
                    </div>`
    fragment.appendChild(li)
    if (!item.badge) pos.push(index)
  })
  ul.appendChild(fragment)
  //处理 badge 值为空的渲染情况
  if (pos.length !== 0) {
    pos.forEach(elem => {
      document.querySelectorAll('.user-badge')[elem].style.display = 'none'
    })
  }
}

// 状态切换辅助函数
function statusChange(str){
  menu.style.display = str === 'menu' ? 'none' : 'inline-block'
  close.style.display = str === 'menu' ? 'inline-block' : 'none'
  showDetails.style.display = str === 'menu' ? 'block' : 'none'
  activeOrInactiveList.forEach(item => {
    item.style.display = str === 'menu' ? 'none' :'block'
  }) 
}

// 页面复原辅助函数
function pageRecover(flag) {
  showDetails.style.display = flag  ? 'none' : 'block'
  activeOrInactiveList.forEach(item => {
    item.style.display = flag ? 'block' : 'none'
  })
}

//实现导航栏折叠
function collapse() {
  //点击 menu
  menu.addEventListener('click', () => statusChange('menu'))
  //点击 close
  close.addEventListener('click', () => statusChange('close'))
  //实现缩放页面复原
  window.addEventListener('resize', () => {
    if (document.body.clientWidth >= 920) pageRecover(1)
    else if (close.style.display !== 'none' && menu.style.display === 'none')  pageRecover(0)
  })
}

async function run() {
  await load()
  createList()
  collapse()
}

run()
