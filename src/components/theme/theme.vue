<template>
    <div class="theme-wrapper" >
            <div  ref="themeWrapper" class="ul-wrapper">
                <ul class="themes-list">
                    <li v-for="item in themes" class="theme" @click="showTheme(item.id)">
                        <h1 class="name">{{item.name}}</h1>
                        <img :src="item.thumbnail" class="img"/>
                        <span class="des">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <div class="theme-detail" v-if="themeFlag">
                <div class="detail-top">
                    <mu-appbar  title="日报详单">
                        <mu-icon-button icon="close" slot="left" @click="closeTheme"/>
                    </mu-appbar>
                </div>
                <div class="detail-list" ref="detailHook">
                    <ul>
                        <li v-for="item in detailTheme.stories" class="detail-item">
                            <span class="title" @click="showArticle(item.id)">{{item.title}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="article" v-if="articleFlag">
                <div class="article-top">
                    <mu-appbar  title="内容详情">
                        <mu-icon-button icon="close" slot="left" @click="closeArticle"/>
                    </mu-appbar>
                </div>
                <div v-html="articleHtml" class="article">
                </div>
            </div>
    </div>
</template>
<script>
        import BScroll from 'better-scroll';
        export default {
            data() {
                return {
                    themes: {},
                    detailTheme: {},
                    themeFlag: false,
                    articleFlag: false,
                    articleHtml: ''
                };
            },
            created() {
                this.$http.get('api/4/themes').then((response) => {
                    this.themes = response.body.others;
                    this.$nextTick(() => {
                        if (this.$refs.themeWrapper) {
                            this._initScroll();
                        }
                    });
                });
            },
            methods: {
                    _initScroll() {
                        this.themeScroll = new BScroll(this.$refs.themeWrapper, {
                            click: true,
                            probeType: 3
                        });
                    },
                    showTheme(id) {
                        if (!event._constructed) {
                            return;
                        }
                        this.detailTheme = {};
                        this.themeFlag = true;
                        this.$http.get(`api/4/theme/${id}`).then((response) => {
                            this.detailTheme = response.body;
                        });
                    },
                    showArticle(id) {
                        this.articleHtml = '';
                        this.articleFlag = true;
                        this.$http.get(`api/4/news/${id}`).then((response) => {
                            this.articleHtml = response.body.body;
                        });
                    },
                    closeTheme() {
                        this.themeFlag = false;
                    },
                    closeArticle() {
                        this.articleFlag = false;
                    }
                }
        };
</script>
<style lang="stylus" rel='stylesheet/stylus'>
    .theme-wrapper
        position:absolute
        top:0
        left:0
        bottom:56px
        width:100%
        overflow:hidden
        .ul-wrapper
            position:absolute
            top:0
            bottom:0
            left:0
            .themes-list
                display:flex
                flex-wrap:wrap
                justify-content:space-between
                width:100%
                padding:0 10px
                font-size:12px
                .theme
                    width:47%
                    margin-top:10px
                    border-radius:10px
                    box-shadow: 5px 5px #dadada
                    overflow:hidden
                    .img
                        width:100%
                        height:200px
                    .name
                        margin:0
                        text-align:center
                    .des
                        display:block
                        padding-left:5px
        .theme-detail
            position:fixed
            top:0
            left:0
            bottom:56px
            width:100%
            background-color:white
            overflow:hidden
            .detail-list
                position:absolute
                top:56px
                bottom:0px
                left:0px
                width:100%
                overflow:auto
                ul
                    width:100%
                    padding:0 10px

                    .detail-item
                        display:flex
                        align-items:center
                        height:50px
                        width:100%
                        margin-top:10px
                        .title
                            font-size:15px
                            font-weight:bold
                            color:#2b2b2b
                            text-decoration:underline
        .article
            position:fixed
            top:0
            left:0
            bottom:56px
            width:100%
            overflow-y:auto
            overflow-x:hidden
            background-color:white
            z-index:100
            .article
                position:absolute
                top:56px
                left:0
                bottom:0
                width:100%
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