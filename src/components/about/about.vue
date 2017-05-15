<template>
    <div class="about-wrapper">
        <img class="avatar" src="/static/image/mime.png"/>
        <div class="infowrapper">
            <ul>
                <li class="item">
                    <span>作者:</span>
                    <span>zhoushaotian</span>
                </li>
                <li class="item">
                    <span>github地址:</span>
                    <a href="https://github.com/zhoushaotian/zhihudaily" class="link">https://github.com/zhoushaotian/zhihudaily</a>
                </li>
                <li class="item">
                    <span>E-mail:</span>
                    <span>245406994@qq.com</span>
                </li>
                <li class="item">
                    <span>
                        基于Vue2以及muse-ui开发的知乎日报，所有源数据均来自知乎API
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
        export default {};
</script>
<style lang="stylus" rel='stylesheet/stylus'>
    .about-wrapper
        position:absolute
        top:0
        left:0
        bottom:56px
        width:100%
        .avatar
            display:block
            margin:50px auto
            margin-bottom:0
            width:100px
            height:100px
            border-radius:50%
        .infowrapper
            width:100%
            font-size:15px
            color:black
            .item
                height:30px
                line-height:30px
                .link
                    color:black
                    text-decoration:underline

</style>