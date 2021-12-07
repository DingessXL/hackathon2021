<template>
  <div class="news-view" :class="{ loading: !items.length }">
    <!-- item list -->


    <ul>
      <li v-for="item in items" class="itemContainer">
        <span class="username">{{ item.name || "FREE"}}</span>
        <span v-if="item.imgs.length" class="script">Image Owned:</span>
        <span v-else class="script" >No Image Owned</span>
        <ul>
          <li v-for="img in item.imgs" class="imageWrap">
            <img :src="img.image_url" class="image" onerror="this.style.display='none';"  />
          </li>
        </ul>
      </li>
    </ul>
    
    <!-- navigation -->
    <!-- <div class="nav" v-show="items.length > 0">
      <a v-if="page > 1" :href="'#/news/' + (page - 1)">&lt; prev</a>
      <a v-if="page < 4" :href="'#/news/' + (page + 1)">more...</a>
    </div> -->
  </div>
</template>

<script>
import Rest from '../store/Rest'
import Item from './Item.vue'

export default {

  name: 'NewsView',

  components: {
    Item
  },

  data () {
    return {
      page: 1,
      items: [
        // {
        //   name: "tttt 1",
        //   imgs: ["a.png", "b.png"]
        // },
        // {
        //   name: "ttt 2",
        //   imgs: ["c.png", "d.png"]
        // },
      ]
    }
  },

  route: {
    data () {
      return {
        items: [
          {
            name: "Dan",
            imgs: [{image_url: "/images/1.jpg"}, {image_url: "/images/2.jpg"}]
          },
          {
            name: "Don",
            imgs: [{image_url: "/images/3.jpg"}]
          },
          {
            name: "Elvin",
            imgs: []
          },


        ]
      }
      // This is the route data hook. It gets called every time the route
      // changes while this component is active.
      // 
      // What we are doing:
      // 
      // 1. Get the `to` route using ES2015 argument destructuring;
      // 2. Get the `page` param and cast it to a Number;
      // 3. Fetch the items from the store, which returns a Promise containing
      //    the fetched items;
      // 4. Chain the Promise and return the final data for the component.
      //    Note we are waiting until the items are resolved before resolving
      //    the entire object, because we don't want to update the page before
      //    the items are fetched.
      // const page = +to.params.page
      // document.title = 'Vue.js HN Clone'
      // return store.fetchItemsByPage(page).then(items => ({
      //   page,
      //   items
      // }))
    }
  },

  created () {

    // store.on('topstories-updated', this.update)
    Rest.getUsers().then((data) => {

      console.log("hahaah all users: ", data);
    });

        Rest.getAllCards().then((data) => {
          console.log("hahaah all cards 1: ", data);
        

      let allCards = data.map(elem=> {
        
        let card = JSON.parse(elem.card);
        console.log(" each individula card: ", card);
        return {
          img: card.img,
          claimedBy: card.claimedBy,
          name: card.name

        };
      });

      console.log("hahaah all cards: ", allCards);

      let trueData = {}
      allCards.forEach(elem => {
        if (trueData[elem.claimedBy]){
          trueData[elem.claimedBy].push(elem.img)
        } else {
          trueData[elem.claimedBy] = [];
          trueData[elem.claimedBy].push(elem.img)
        }
        
      })

      console.log("hahaah all cards: ", trueData);

let truDataArray = []
      Object.keys(trueData).forEach(key => {
        console.log("here is aray : trueData[key]", trueData[key]);
        let mapping  = trueData[key].map(item => {
            return {image_url: item}
        });
        console.log("here is aray : mkapping", mapping);
        if (key == "null") key = "FREE"
        truDataArray.push({
          name: key,
          imgs: mapping
        })
      })

      console.log("fial: ", truDataArray);

this.items = truDataArray;


    });
    
  },

  destroyed () {
    store.removeListener('topstories-updated', this.update)
  },

  methods: {
    update () {
      store.fetchItemsByPage(this.page).then(items => {
        // this.items = items
      })
    }
  },

  filters: {
    formatItemIndex (index) {
      return (this.page - 1) * store.storiesPerPage + index + 1
    }
  }
}
</script>

<style lang="stylus">


.news-view
  padding-left 5px
  padding-right 15px
  &.loading:before
    content "Loading..."
    position absolute
    top 16px
    left 20px
  .nav
    padding 10px 10px 10px 40px
    margin-top 10px
    border-top 2px solid #f60
    a
      margin-right 10px
      &:hover
        text-decoration underline
  .username
    font-size 18px
    font-weight bold
    padding-right 30px
  .script
    font-size: 12px
  .image
    width 200px
  .imageWrap
    padding: 15px
    display inline-block
  .itemContainer
    padding 15px 0
</style>
