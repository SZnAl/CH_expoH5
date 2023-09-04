<template>
	<div id="app">
		<!-- <nav>
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</nav> -->
		<router-view />
	</div>
</template>

<style>
.icon,
.iconfont {
	font-family: 'iconfont' !important;
	font-size: 46px !important;
	/* font-weight: 600; */
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-webkit-text-stroke-width: 0.2px;
	-moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
	display: none;
}
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
ul,
ol {
	list-style: none;
}
a,
u {
	text-decoration: none;
}
b,
strong {
	font-weight: 400;
}
i,
em {
	font-style: normal;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: normal;
	font-size: 16px;
}
input {
	border: 0;
	outline: none;
}
.clearfix::after {
	content: ' ';
	display: block;
	width: 0;
	height: 0;
	overflow: hidden;
	visibility: hidden;
	clear: both;
}
.van-popover__action {
	width: 100px !important;
}
.van-popover {
	left: 640px !important;
}
.van-popover__arrow {
	right: 20px !important;
}
</style>
