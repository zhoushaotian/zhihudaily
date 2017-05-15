<template>
    <div class="wrapper"  ref="themeWrapper">
            <ul class="theme-wrapper">
                <li v-for="item in themes" class="theme" @click="showTheme(item.id)">
                    <h1 class="name">{{item.name}}</h1>
                    <img :src="item.thumbnail" class="img"/>
                    <span class="des">{{item.description}}</span>
                </li>
            </ul>
            <div class="theme-detail" v-show="themeFlag">
                <div class="detail-top">
                    <mu-appbar  title="日报详单">
                        <mu-icon-button icon="close" slot="left" @click="closeTheme"/>
                    </mu-appbar>
                </div>
                <div class="detail-list" ref="detailHook">
                    <ul>
                        <li v-for="item in detailTheme.stories" class="detail-item">
                            <span class="title">{{item.title}}</span>
                        </li>
                    </ul>
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
                    themeFlag: false
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
                    closeTheme() {
                        this.themeFlag = false;
                    }
                }
        };
</script>
<style lang="stylus" rel='stylesheet/stylus'>
    .wrapper
        position:absolute
        top:0
        left:0
        bottom:56px
        width:100%
        overflow:hidden
        .theme-wrapper
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



</style>