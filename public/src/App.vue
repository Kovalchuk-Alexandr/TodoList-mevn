<template>
  <main>
    <div>
      <h2>Todo Form</h2>
      <form>
        <input
          type="text"
          v-model="title"
          placeholder="What do you want to do?"
        />
        <input type="text" v-model="user" placeholder="Enter You Login" />
        <button type="button" class="btnAdd" @click="addItem(el, i)">
          {{ msgBtnAdd }}
        </button>
      </form>
    </div>
    <div>
      <h2>To do list</h2>
      <!-- Перебираем массив, получаем эл-т, индекс и выводим каждый элемент -->
      <div class="list-item" v-for="(el, i) in items" :key="el._id">
        <p>
          {{ el.title }} <span>{{ el.user }}</span>
        </p>
        <!-- <p>{{ el.user }}</p> -->
        <p>
          {{ el.published }}
          <button @click="deleteItem(el, i)">Delete</button>
          <button class="btnEdit" @click="editItem(el, i)">Edit</button>
        </p>
      </div>
    </div>
  </main>
</template>

<!-- ---------- vue - приложение -------------- -->
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      title: "",
      user: "",
      msgBtnAdd: "Add Item",
      isNew: true,
      el: {},
      i: 0,
      id: 0,
    };
  },

  // Во vue.config.js сказали, что вместо 'api/'
  // подставляем 'http://localhost:3000'
  // переходим на главную страницу нашего api-приложения
  async mounted() {
    const result = await axios.get("/api/todo-item");
    this.items = result.data;
  },
  methods: {
    // Удаление записей
    async deleteItem(el, i) {
      await axios.delete("/api/todo-item/" + el._id);
      // обращаемся к массиву и обрезаем, начиная с индекса 'i' - один элемент
      this.items.splice(i, 1);
    },
    // Добавление записей
    async addItem() {
      let date = Date.now();
      let url = `/api/todo-item/?title=${this.title}&user=${this.user}&published=${date}`;
      // так не сработает, нужно передавать параметры в командной строке (запросе)
      // const result = await axios.post("/api/todo-item/", {
      //   title: this.title,
      //   user: this.user,
      //   published: Date.now(), //"2023",
      // });
      if (this.isNew) {
        await axios.post(url);
        // Отображаем запись
        this.items.push({
          title: this.title,
          user: this.user,
          published: date,
        });
      } else {
        // await axios.put(url + this.id);
        await axios.post(url);
        // console.log("Inside Add i: " + i);
        console.log("el.title: " + this.el.title);
        // console.log("this.items.user: " + this.items[i].user);
        console.log("this.title: " + this.title);
        console.log("this.user: " + this.user);
        console.log("date: " + date);
        this.el.title = this.title;
        this.el.user = this.user;
        this.el.published = date;

        this.msgBtnAdd = "Add Item";
      }
      // Очищаем переменные title, user - и значения внутри input-полей
      this.title = "";
      this.user = "";
    },
    // Обновление записей
    async editItem(el, i) {
      // let date = Date.now();
      this.el = el;
      this.i = i;
      this.id = el._id;
      this.isNew = false;
      console.log("isNew after: " + this.isNew);
      console.log("msgBtnAdd: " + this.msgBtnAdd);

      this.msgBtnAdd = "Update";
      console.log("msgBtnAdd: " + this.msgBtnAdd);
      console.log("this.el: ");
      console.log(this.el);
      console.log("this.i: " + this.i);
      console.log("this.id: " + this.id);
      // btnAdd.innerHTML = "Update";
      // let url = `/api/todo-item/?title=${this.title}&user=${this.user}&published=${date}`;
      //  await axios.post(url);
      // Отображаем запись
      // this.items.push({
      //   title: this.title,
      //   user: this.user,
      //   published: date,
      // });
      // console.log(`el: ${el}, i: ${i}`);
      // `title: (!(${title}) == '' ? ${title}: '') , this.title: ${this.title}`
      console.log(`el: ${el}`);
      console.log(`title: ${el.title}`);
      console.log(`user: ${el.user}`);
      console.log(`published: ${el.published}`);

      this.title = el.title;
      this.user = el.user;
    },
  },
};
</script>

<style>
.list-item {
  width: 100%;
  background: aquamarine; /*#fcddaf; #dfbc4c*/
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid silver;
  border-radius: 5px;
  font-size: 14px;
}

.list-item p {
  margin-bottom: 8px;
}

.list-item p span {
  float: right;
  font-size: 12px;
  color: #8f772d;
}

.list-item p:last-child {
  color: #b1953c;
  font-size: 11px;
}

.list-item button {
  /* display: block; */
  float: right;
  border: 0;
  border-radius: 5px;
  padding: 4px 8px;
  margin: 0;
  margin-left: 10px;
  color: #fddaae;
  cursor: pointer;
  font-size: 12px;
  /* transition: transform 300ms ease; */
}

.btnEdit {
  background: #348531;
}

/* .list-item button:hover {
  transform: scale(1.1);
} */
</style>
