<template>
	<div id="login">
		<div class="topBar">
			<!-- <img src="@/assets/back.png" class="backBtn" /> -->
			<div class="titleBox"><p class="title">Sign in</p></div>
		</div>

		<div class="inputBox">
			<div class="input">
				<input
					:class="[
						'userName',
						{ inputEmpty: userCheck == false },
						{ shake: userCheck == false },
					]"
					v-model="username"
					type="text"
					placeholder="User name"
				/>
				<i class="icon"><img src="@/assets/user.png" /></i>
			</div>
			<div class="input margin1">
				<input
					:class="[
						'userName',
						{ inputEmpty: pass1Check == false },
						{ shake: pass1Check == false },
					]"
					v-model="password1"
					type="password"
					placeholder="Password"
				/>
				<i class="icon"><img src="@/assets/lock.png" /></i>
			</div>
		</div>

		<div class="btnBox">
			<button class="goBtn" @click="clickGo"><p>GO!</p></button>
			<button class="regBtn" @click="clickReg"><p>Register</p></button>
		</div>

		<!-- <div class="logo"><img src="@/assets/HICART.png" /></div> -->
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: undefined,
			password1: undefined,
			userCheck: true,
			pass1Check: true,
		};
	},
	computed: {},
	/* eslint-disable */
	watch: {
		// username: {
		// 	handler(newVal) {
		// 		if (newVal == undefined || newVal == '') {
		// 			this.userCheck = false;
		// 		}
		// 	},
		// },
		// password1: {
		// 	handler(newVal) {
		// 		if (newVal == undefined || newVal == '') {
		// 			this.pass1Check = false;
		// 		}
		// 	},
		// },
	},
	mounted() {},
	methods: {
		clickReg() {
			this.$router.replace('/reg');
		},
		clickGo() {
			if (this.username == '' || this.username == undefined) {
				this.userCheck = false;
			} else {
				this.userCheck = true;
			}
			if (this.password1 == '' || this.password1 == undefined) {
				this.pass1Check = false;
			} else {
				this.pass1Check = true;
			}
			if (this.username && this.password1) {
				window.sessionStorage.setItem('superhiiCache', 'pass');
				this.$router.replace('/home');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.shake {
	border-color: red;
	animation: shake 800ms ease-in-out;
}
@keyframes shake {
	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}
	20%,
	80% {
		transform: translate3d(+2px, 0, 0);
	}
	30%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}
	40%,
	60% {
		transform: translate3d(+4px, 0, 0);
	}
	50% {
		transform: translate3d(-4px, 0, 0);
	}
}
.inputEmpty {
	border: 1px solid red !important;
}
@media screen and (max-height: 736px) {
	#login {
		background-size: 100% 100% !important;
	}
}
#login {
	width: 100%;
	height: 100%;
	position: fixed;
	background-image: url(@/assets/login-bg.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: 120% 100%;
	.topBar {
		display: flex;
		align-items: center;
		height: 88px;
		margin-top: 40px;
		.backBtn {
			width: 44px;
			height: 44px;
			margin: 20px;
			position: relative;
		}
		.titleBox {
			width: 100%;
			display: flex;
			justify-content: center;
			margin-right: 144px;
			.title {
				margin-left: 120px;
				font-size: 36px;
				font-weight: bold;
				color: #000000;
			}
		}
	}
	.inputBox {
		margin: 80px 76px 0 74px;
		.margin1 {
			margin-top: 120px;
		}
		.input {
			position: absolute;
			.userName {
				width: 600px;
				height: 96px;
				background: #ffffff;
				border-radius: 58px 58px 58px 58px;
				padding-left: 90px;
			}
			.icon {
				position: relative;
				left: -90%;
				img {
					width: 28px;
				}
			}
		}
	}
	.btnBox {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 420px;
		.goBtn {
			width: 600px;
			height: 116px;
			background: #5393ce;
			border-radius: 58px 58px 58px 58px;
			margin-bottom: 20px;
			border: none;
			p {
				font-size: 32px;
				font-weight: 400;
				color: #ffffff;
			}
		}
		.regBtn {
			width: 600px;
			height: 116px;
			border-radius: 58px 58px 58px 58px;
			border: 4px solid #5393ce;
			background-color: #ffffff00;
			p {
				font-size: 32px;
				font-weight: 400;
				color: #5393ce;
			}
		}
	}
	.logo {
		width: 100%;
		height: 110px;
		position: fixed;
		bottom: 0%;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 288px;
			height: 70px;
			margin-bottom: 40px;
		}
	}
}
</style>
