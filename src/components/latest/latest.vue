<template>
    <div class="latest-wrapper">
            <div class="top">
                <mu-appbar :title="news.date">
                    <mu-icon-button icon="home" slot="left" @click="goHome"/>
                    <mu-flat-button label="前一天" slot="right" @click="deSdate"/>
                    <mu-flat-button label="后一天" slot="right" @click="addSdate"/>
                </mu-appbar>
            </div>
            <div class="story-wrapper" ref="storyHook">
                    <ul class="stories">
                        <li class="story" v-for="item in news.stories" @click="showDetail(item.id)">
                            <div class="img-wrapper">
                                <img :src="item.images[0]"/>
                            </div>
                            <div class="title-wrapper">
                                <span class="title">{{item.title}}</span>
                            </div>
                        </li>
                    </ul>
            </div>
        <div class="pop" v-if="flagDetail">
            <div class="detail-top">
                <mu-appbar  title="内容详情">
                    <mu-icon-button icon="close" slot="left" @click="closeDetail"/>
                </mu-appbar>
            </div>
            <div v-html="storyHtml" class="detail">
            </div>
        </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    export default {
        data() {
            return {
                today: '',
                news: '',
                Sdate: new Date(),  // 当前搜索日期
                storyHtml: '', // 表示要浏览的某一特定文章的html
                flagDetail: false // 当点击某一篇文章的时候值变为true
            };
        },
        created() {
             this.$http.get('api/4/news/latest').then((response) => {
                this.news = response.body;
                this.today = response.body.date;
                this.$nextTick(() => {
                    this._initScroll();
                });
            });
        },
        methods: {
            deSdate() {
                let a = new Date(this.Sdate.getFullYear(), this.Sdate.getMonth(), this.Sdate.getDate() - 1);
                let str = `${this.Sdate.getFullYear().toString()}0${(this.Sdate.getMonth() + 1).toString()}${this.Sdate.getDate() <= 9 ? 0 : ''}${this.Sdate.getDate()}`;
                this.Sdate = a;  // 将搜索日期修改为前一天
                let url = `api/4/news/before/${str}`;
                this.$http.get(url).then((response) => {
                    this.news = response.body;
                    this.$nextTick(() => {
                        this.storyScroll.refresh();
                        this.storyScroll.scrollTo(0, 0);
                    });
                });
            },
            addSdate() {
                let a = new Date(this.Sdate.getFullYear(), this.Sdate.getMonth(), this.Sdate.getDate() + 1);
                //  将搜索的搜索日期
                let str = `${a.getFullYear().toString()}0${(a.getMonth() + 1).toString()}${a.getDate() <= 9 ? 0 : ''}${a.getDate()}`;
                // 构造实际的搜索日期，如搜索20170430 则url后的日期应该为20170501
                let b = new Date(this.Sdate.getFullYear(), this.Sdate.getMonth(), this.Sdate.getDate() + 2);
                if (parseInt(str) < parseInt(this.today)) {
                    str = `${b.getFullYear().toString()}0${(b.getMonth() + 1).toString()}${b.getDate() <= 9 ? 0 : ''}${b.getDate()}`;
                    this.Sdate = a;
                    let url = `api/4/news/before/${str}`;
                    this.$http.get(url).then((response) => {
                        this.news = response.body;
                        this.$nextTick(() => {
                            this.storyScroll.refresh();
                            this.storyScroll.scrollTo(0, 0);
                        });
                    });
                } else if (str === this.today) {
                    this.$http.get('api/4/news/latest').then((response) => {
                        this.news = response.body;
                        this.$nextTick(() => {
                            this.storyScroll.refresh();
                            this.storyScroll.scrollTo(0, 0);
                        });
                    });
                    this.Sdate = a;
                } else {
                    this.storyScroll.refresh();
                }
            },
            _initScroll() {
                if (this.$refs.storyHook) {
                    this.storyScroll = new BScroll(this.$refs.storyHook, {
                        click: true,
                        probeType: 3
                    });
                }
                /*
                this.storyScroll.on('scrollStart', () => {
                    this.storyScroll.refresh();
                });
                */
            },
            goHome() {
                this.Sdate = new Date();
                this.$http.get('api/4/news/latest').then((response) => {
                    this.news = response.body;
                });
            },
            showDetail(id) {
                if (!event._constructed) {
                    return;
                }
                this.storyHtml = '';    // 先清空之前的storyHtml 以免显示页面的时候会有刷新感
                let url = `api/4/news/${id}`;
                this.$http.get(url).then((response) => {
                    this.storyHtml = response.body.body;
                });
                this.flagDetail = true;
            },
            closeDetail() {
                this.flagDetail = false;
            }
        }
    };
</script>
<style lang="stylus" rel='stylesheet/stylus'>
    .latest-wrapper
        position:absolute
        top:0
        left:0
        bottom:56px
        width:100%
        overflow:hidden
        background:#f9faff
        .top
            height:56px
            width:100%
        .story-wrapper
            position:absolute
            top:56px
            left:0
            bottom:0
            width:100%
            overflow:hidden
            .stories
                padding:20px 15px
                .story
                    display:flex
                    height:160px
                    padding:5px
                    margin-bottom:15px
                    border-radius:10px
                    box-shadow: 5px 5px #f2f2f2
                    background:white
                    .img-wrapper
                        width:150px
                        height:100%
                        margin-right:5px
                    .title-wrapper
                        align-self:center
                        .title
                            font-size:15px
    .pop
        position:fixed
        top:0
        bottom:0
        left:0
        width:100%
        z-index:100
        background:white
        .detail-top
            position:absolute
            top:0
            left:0
            height:56px
            width:100%
        .detail
            position:absolute
            top:56px
            bottom:0
            left:0
            width:100%
            overflow:auto
            .question
                padding:5px
                .question-title
                    width:100%
                    font-size:15px
                    line-height:25px
                    font-weight:bold
                    text-align:center
                    border-bottom:5px solid #fafafa
                .answer
                    .meta
                        height:34px
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        font-size:16px
                        color: #b8b8b8
                        .avatar
                            display:inline-block
                            width:34px
                            height:34px
                            vertical-align:middle
                    .content
                        color: #444;
                        font-size: 17px;
                        margin: 10px 0 20px;
                        img
                            max-width:100%
                            display:block
                            margin:30px auto



                
</style>