<template>
	<div id="login">
		<div class="topBar">
			<!-- <img src="@/assets/back.png" class="backBtn" @click="toLogin" /> -->
			<i class="iconfont backBtn icon-fanhui" @click="toLogin"></i>
			<!-- <div class="titleBox"><p class="title">Member Registration</p></div> -->
			<div class="titleBox"><p class="title">Member Registration</p></div>
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
					placeholder="enter one user name"
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
					placeholder="Input password"
				/>
				<i class="icon"><img src="@/assets/lock.png" /></i>
			</div>

			<div class="input margin2">
				<input
					:class="[
						'userName',
						{ inputEmpty: pass2Check == false },
						{ shake: pass2Check == false },
					]"
					v-model="password2"
					type="password"
					placeholder="Confirm password again"
				/>
				<i class="icon"><img src="@/assets/lock.png" /></i>
			</div>
			<p class="passwordTips" v-show="passTips == true">
				The two passwords are inconsistent
			</p>
		</div>

		<div>
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
			password2: undefined,
			userCheck: true,
			pass1Check: true,
			pass2Check: true,
			passTips: false,
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
		// password2: {
		// 	handler(newVal) {
		// 		if (newVal == undefined || newVal == '') {
		// 			this.pass2Check = false;
		// 		}
		// 	},
		// },
	},
	mounted() {},
	methods: {
		toLogin() {
			this.$router.push('/');
		},
		checkPassword() {
			if (this.password1 != this.password2) {
				this.pass1Check = false;
				this.pass2Check = false;
				this.passTips = true;
			} else {
				this.pass1Check = true;
				this.pass2Check = true;
				this.passTips = false;
			}
		},
		clickReg() {
			this.checkPassword();
			if (this.username == '' || this.username == undefined) {
				this.userCheck = false;
			} else {
				this.userCheck = true;
			}
			if (this.password1 == '' || this.password1 == undefined) {
				this.pass1Check = false;
			}
			if (this.password2 == '' || this.password2 == undefined) {
				this.pass2Check = false;
			}
			if (this.password1 !== this.password2) {
				this.pass1Check = false;
				this.pass2Check = false;
			}
			if (
				this.username &&
				this.password1 &&
				this.password2 &&
				this.password1 == this.password2
			) {
				window.sessionStorage.setItem('superhiiCache', 'pass');
				this.$router.push('/home');
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
#login {
	width: 100%;
	height: 100%;
	position: fixed;
	background-image: url(@/assets/login-bg.png);
	background-repeat: no-repeat;
	background-size: cover;
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
		.margin2 {
			margin-top: 240px;
		}
		.passwordTips {
			position: absolute;
			margin: 340px 0 0 32px;
			font-size: 22px;
			font-weight: 400;
			color: #ff0000;
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
	.regBtn {
		width: 600px;
		height: 116px;
		background: #5393ce;
		border-radius: 58px 58px 58px 58px;
		margin: 520px 76px 0 74px;
		border: none;
		p {
			font-size: 32px;
			font-weight: 400;
			color: #ffffff;
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
