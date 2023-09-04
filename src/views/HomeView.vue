<template>
	<div :class="['warpper', { colorGray: gray == true }]" ref="scrollRef">
		<!-- 頂部bar -->
		<van-sticky>
			<div class="topBar">
				<div class="imgL">
					<!-- <img
						src="@/assets/back.png"
						@click="clickBack"
						v-show="showPage !== 'list'"
					/> -->
					<i
						class="iconfont icon-fanhui"
						@click="clickBack"
						v-show="showPage !== 'list'"
					></i>
				</div>
				<p>
					{{ title }}
				</p>

				<van-popover
					class="popover"
					v-if="showPage == 'list'"
					v-model="showPopover"
					theme="dark"
					placement="bottom-end"
					trigger="click"
					:actions="actions"
					@select="selectMore"
				>
					<template #reference>
						<button class="homeBtn">
							<!-- <img src="@/assets/more.png" class="imgR" /> -->
							<i class="iconfont imgR icon-gengduo1" @click="clickBack"></i>
						</button>
					</template>
				</van-popover>

				<!-- <img
					@click="clickHome"
					src="@/assets/home.png"
					class="imgHome"
					v-if="
						showPage == 'memberCardDetails' ||
						showPage == 'memberNum' ||
						showPage == 'pay' ||
						showPage == 'storedValue' ||
						showPage == 'paySuccess' ||
						showPage == 'coupon' ||
						showPage == 'preList'
					"
				/> -->
				<i
					class="iconfont imgHome icon-home-page"
					@click="clickHome"
					v-if="
						showPage == 'memberCardDetails' ||
						showPage == 'memberNum' ||
						showPage == 'pay' ||
						showPage == 'storedValue' ||
						showPage == 'paySuccess' ||
						showPage == 'coupon' ||
						showPage == 'preList'
					"
				></i>
			</div>
		</van-sticky>

		<!-- 列表 -->
		<div class="list" v-if="showPage == 'list'">
			<ul>
				<li v-for="(item, index) in list" :key="index" @click="clickLi(item)">
					<div :class="item.liImg">
						<div class="liL"><img :src="item.logo" /></div>
						<div class="liR">
							{{ item.title }}
							<br />Supermarket
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!-- 会员卡详情页 -->
		<transition :name="transitionName">
			<div class="memberCardDetails" v-if="showPage == 'memberCardDetails'">
				<div class="white-bg">
					<div :class="['card', item.bgImg]">
						<div class="top">
							<div class="left"><img :src="item.logo" /></div>
							<div class="right">
								{{ item.title }}
								<br />Supermarket
							</div>
						</div>
						<div class="bottom">
							<div class="left" @click="clickMemberNum">
								<p>{{ item.CardNumber }}</p>
							</div>
							<div class="right" @click="clickMemberNum">
								<img src="@/assets/QRCode.png" />
							</div>
						</div>
					</div>

					<div class="balance">
						<p class="left">Balance</p>
						<p class="right">$ {{ item.balance }}.00</p>
					</div>

					<div class="payment" @click="clickPay"><p>Payment</p></div>
				</div>
				<div class="menuList">
					<!-- 优惠券 -->
					<div class="menu" @click="clickCoupon">
						<div class="left">
							<img src="@/assets/coupon.png" />
							<p>Coupon</p>
						</div>
						<div>
							<!-- <img src="@/assets/next.png" /> -->
							<i class="iconfont icon-gengduo"></i>
						</div>
					</div>
					<div class="line"></div>
					<!-- 储值 -->
					<div class="menu" @click="clickStored">
						<div class="left">
							<img src="@/assets/wallet.png" />
							<p>Stored value</p>
						</div>
						<div>
							<!-- <img src="@/assets/next.png" /> -->
							<i class="iconfont icon-gengduo"></i>
						</div>
					</div>

					<div class="line"></div>
					<!-- 预购物清单 -->
					<div class="menu" @click="clickShoppingList">
						<div class="left">
							<img src="@/assets/calendar.png" />
							<p>Pre shopping list</p>
						</div>
						<div>
							<!-- <img src="@/assets/next.png" /> -->
							<i class="iconfont icon-gengduo"></i>
						</div>
					</div>

					<!-- <div class="menu"></div> -->
					<!-- <div class="menu"></div> -->
				</div>
			</div>
		</transition>

		<!-- 会员卡号 -->
		<transition>
			<div class="memberNum" v-if="showPage == 'memberNum'">
				<div :class="['card', item.liImg]">
					<div class="liL"><img :src="item.logo" /></div>
					<div class="liR">
						{{ item.title }}
						<br />Supermarket
					</div>
				</div>
				<div class="barcode"><img src="@/assets/barscode_ex.png" /></div>
			</div>
		</transition>

		<!-- 付款 -->
		<transition>
			<div class="pay" v-if="showPage == 'pay'">
				<!-- <img src="@/assets/barcode_ex.png" class="barcode" /> -->
				<img src="@/assets/paycode_ex.png" class="qrcode" />

				<div class="balance">
					<p class="left">Wallet account balance：</p>
					<p class="right">$ {{ item.balance }}.00</p>
				</div>
			</div>
		</transition>

		<!-- 优惠券 -->
		<transition :name="transitionName">
			<div class="coupon" v-if="showPage == 'coupon'">
				<van-tabs
					v-model="couponType"
					sticky
					class="couponTab"
					animated
					ref="tabs"
				>
					<van-tab title="Available">
						<div class="item" v-for="(item, index) in couponList" :key="index">
							<div class="top">
								<div class="left">
									<p class="icon">$</p>
									<p class="value">{{ item.discountAmount }}</p>
								</div>
								<div class="middle">
									<div class="midd-top">
										<p class="black">
											{{
												item.validType == 1
													? 'Conditions of Use'
													: 'Scope of use'
											}}
										</p>
										<p class="red">
											{{
												item.validType == 1
													? 'Full $' + item.couponRule
													: item.goodsName + 'dedicated'
											}}
										</p>
									</div>
									<div class="midd-bottom">
										<p class="black">
											{{ item.validType == 1 ? 'Scope of use' : '' }}
										</p>
										<p class="red">
											{{ item.validType == 1 ? 'General use' : '' }}
										</p>
									</div>
								</div>
								<div class="right">
									<div class="green">normal</div>
								</div>
							</div>
							<div class="line"></div>
							<div class="bottom">
								<div class="left">
									<p class="left">Term of validity：</p>
									<p class="right">{{ item.startDate }} ~{{ item.endDate }}</p>
								</div>
								<div class="right">
									<p @click="clickDetails(index)">Details ></p>
								</div>
							</div>
						</div>

						<!-- <div class="item">
							<div class="top">
								<div class="left">
									<p class="icon">$</p>
									<p class="value">3</p>
								</div>
								<div class="middle">
									<div class="midd-top">
										<p class="black">Event Details</p>
										<p class="red"></p>
									</div>
									<div class="midd-bottom">
										<p class="black">Scope of application</p>
										<p class="red">Hair care essential oil</p>
									</div>
								</div>
								<div class="right">
									<div class="green">normal</div>
								</div>
							</div>
							<div class="line"></div>
							<div class="bottom">
								<div class="left">
									<p class="left">Term of validity：</p>
									<p class="right">2022/11/01 ~2023/01/28</p>
								</div>
								<div class="right">
									<p @click="clickDetails(1)">Details ></p>
								</div>
							</div>
						</div> -->
					</van-tab>
					<van-tab title="Expired">
						<div class="expiredTips">
							Automatically delete 15 days after expiration
						</div>
						<div class="item">
							<div class="top">
								<div class="left">
									<p class="icon">$</p>
									<p class="value">5.00</p>
								</div>
								<div class="middle">
									<div class="midd-top">
										<p class="black">Conditions of Use</p>
										<p class="red">Coca-Cola dedicated</p>
									</div>
									<div class="midd-bottom">
										<!-- <p class="black">Scope of application</p>
										<p class="red">full-court</p> -->
									</div>
								</div>
								<div class="right">
									<!-- <div class="green">Written off</div> -->
									<div class="gray">Expired</div>
								</div>
							</div>
							<div class="line"></div>
							<div class="bottom">
								<div class="left">
									<p class="left">Term of validity：</p>
									<p class="right">2022/12/18 ~2022/12/21</p>
								</div>
								<div class="right">
									<p @click="clickDetails(4)">Details ></p>
								</div>
							</div>
						</div></van-tab
					>
				</van-tabs>
				<van-popup
					v-if="this.shopCouponDetails !== undefined"
					v-model="showCouponDetails"
					closeable
					position="bottom"
					:style="{ height: '86%' }"
				>
					<div class="details">
						<div class="block">
							<div class="title">Coupon name</div>
							<div class="content">{{ shopCouponDetails.couponName }}</div>
						</div>
						<div class="block">
							<div class="title">Coupon amount</div>
							<div class="content">
								{{ shopCouponDetails.discountAmount }}
							</div>
						</div>
						<div class="block">
							<div class="title">Start time</div>
							<div class="content">{{ shopCouponDetails.startDate }}</div>
						</div>
						<div class="block">
							<div class="title">End time</div>
							<div class="content">{{ shopCouponDetails.endDate }}</div>
						</div>
						<div class="block">
							<div class="title">Details</div>
							<div class="big-content">
								{{
									shopCouponDetails.goodsName == null
										? 'General use'
										: shopCouponDetails.goodsName
								}}
							</div>
						</div>
					</div>
				</van-popup>
			</div>
		</transition>

		<!-- 储值 -->
		<transition :name="transitionName">
			<div class="storedValue" v-if="showPage == 'storedValue'">
				<!-- 金额 -->
				<div>
					<p class="lineTitle">Please select the recharge amount</p>
					<div class="money">
						<div v-for="(item, index) in storedMoney" :key="index">
							<div
								:class="['item', { moneyBtnActived: moneyBtn == item.id }]"
								@click="selectMoney(index, item)"
							>
								$ {{ item.value }}
							</div>
						</div>
					</div>
				</div>
				<!-- 方式 -->
				<div class="typeBox">
					<p class="lineTitle">Select payment method</p>
					<div class="type">
						<div
							v-for="(item, index) in storedType"
							:key="index"
							class="radioBox"
						>
							<van-radio-group v-model="typeBtn">
								<van-radio
									:name="index"
									:value="index"
									:checked="typeBtn == index"
								></van-radio>
							</van-radio-group>
							<div
								:class="[
									'item',
									'moneyType',
									{ moneyTypeBtnActived: typeBtn == item.id },
								]"
								@click="selectType(index, item)"
							>
								<div class="logo">
									<img :src="item.img1" v-if="item.id !== typeBtn" />
									<img :src="item.img2" v-if="item.id == typeBtn" />
								</div>
								<!-- <div>{{ item.value }}</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>

		<!-- 底部按钮 -->
		<div
			class="bottomBtn"
			@click="clickPayment"
			v-if="showPage == 'storedValue'"
		>
			<p
				:class="[
					{ moneyBtnActived: moneyBtn !== undefined && typeBtn !== undefined },
				]"
			>
				$ {{ moneyValue }} Payment
			</p>
		</div>

		<!-- 充值成功 -->
		<transition :name="transitionName">
			<div class="paySuccess" v-if="showPage == 'paySuccess'">
				<img src="@/assets/success-green.png" />
				<div>${{ moneyValue }} Recharge succeeded</div>
			</div>
		</transition>

		<!-- 底部按钮 -->
		<div class="bottomBtn" @click="clickBack" v-if="showPage == 'paySuccess'">
			<p style="background-color: #5393ce; color: white">Return</p>
		</div>

		<!-- 预购物清单 -->
		<transition :name="transitionName">
			<div class="preList" v-if="showPage == 'preList'">
				<div class="item" v-for="(item, index) in detailed" :key="index">
					<div class="left">
						<div class="center"><img :src="item.Images" alt="" /></div>
					</div>
					<div class="right">
						<div class="top">
							<div class="top-l">
								{{ item.Name }}
							</div>
							<div class="top-r">
								<!-- x {{ item.Number }} -->
							</div>
						</div>
						<div class="bottom">
							<!-- <p class="icon">$</p> -->
							<p>{{ item.Price }}</p>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			couponList: [
				{
					couponCode: '202212240011343434',
					couponName: 'Superhii Market',
					discountAmount: '25.00',
					validType: 1,
					promptType: null,
					promptStr: null,
					validGoodsCode: null,
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:13:53',
					couponRule: '100.00',
					status: 1,
					goodsName: null,
				},
				{
					couponCode: '202212240014141414',
					couponName: '$3 off',
					discountAmount: '3.00',
					validType: 2,
					promptType: 1,
					promptStr: '6900000000001',
					validGoodsCode: '6900000000002',
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:21:19',
					couponRule: null,
					status: 1,
					goodsName: 'Ranch Flavored Tortilla Chips',
				},
				{
					couponCode: '202212240022232323',
					couponName: '$1 off',
					discountAmount: '1.00',
					validType: 2,
					promptType: 2,
					promptStr: 'yhq',
					validGoodsCode: '6900000000011',
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:23:20',
					couponRule: null,
					status: 1,
					goodsName: 'Coca-Cola',
				},
				{
					couponCode: '20221224002407077',
					couponName: '$10 off over 30',
					discountAmount: '10.00',
					validType: 1,
					promptType: null,
					promptStr: null,
					validGoodsCode: null,
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:25:03',
					couponRule: '30.00',
					status: 1,
					goodsName: null,
				},
			],

			transitionName: 'slide-left', //过渡方向
			gray: false, //灰色背景
			// 储值金额
			storedMoney: [
				{ value: 50, id: 0 },
				{ value: 100, id: 1 },
				{ value: 200, id: 2 },
				{ value: 300, id: 3 },
				{ value: 500, id: 4 },
				{ value: 1000, id: 5 },
			],
			// 支付方式
			storedType: [
				{
					value: 'PayPal',
					id: 0,
					// img1: require('@/assets/paypal_b.png'),
					// img2: require('@/assets/paypal_w.png'),
					img1: require('@/assets/paypalLOGO.jpg'),
					img2: require('@/assets/paypalLOGO.jpg'),
				},
				{
					value: 'MasterCard',
					id: 1,
					// img1: require('@/assets/MasterCard-b.png'),
					// img2: require('@/assets/MasterCard-org.png'),
					img1: require('@/assets/wanshidaLOGO.jpg'),
					img2: require('@/assets/wanshidaLOGO.jpg'),
				},
			],
			moneyValue: 50,
			moneyBtn: 0,
			typeBtn: 0,
			couponType: undefined,
			showPopover: false, // 右上角菜單
			showCouponDetails: false, //优惠券详情(显示与隐藏if)
			shopCouponDetails: undefined, // 优惠卷详情页面信息
			actions: [
				{ icon: require('@/assets/scan.png'), id: 0 },
				{ icon: require('@/assets/exit.png'), id: 1 },
			],
			showPage: 'list',
			title: 'Super Go membership card',
			// 會員卡詳情頁數據
			item: {
				// logo: require('@/assets/logo1.png'),
				// title: 'RT Market',
				// bgImg: 'liA',
			},
			// 列表數據
			list: [
				{
					logo: require('@/assets/logoHICART.png'),
					bglogo: require('@/assets/logoHICART.png'),
					title: 'HI·CART',
					bgImg: 'bgHiCart',
					liImg: 'liHiCart',
					balance: 1000,
					CardNumber: 13200000001,
				},
				{
					logo: require('@/assets/logs1.png'),
					bglogo: require('@/assets/logs21.png'),
					title: 'All Day',
					bgImg: 'bgCH',
					liImg: 'liCH',
					balance: 1000,
					CardNumber: 13200000001,
				},
				{
					logo: require('@/assets/logs2.png'),
					bglogo: require('@/assets/logs22.png'),
					title: 'Netto',
					bgImg: 'bgA',
					liImg: 'liA',
					balance: 1000,
					CardNumber: 13200000001,
				},
				{
					logo: require('@/assets/logs3.png'),
					bglogo: require('@/assets/logs23.png'),
					title: 'Vanguard',
					bgImg: 'bgB',
					liImg: 'liB',
					balance: 1000,
					CardNumber: 13200000001,
				},
				{
					logo: require('@/assets/logs4.png'),
					bglogo: require('@/assets/logs24.png'),
					title: 'YB-YOKUBENIMARU',
					bgImg: 'bgC',
					liImg: 'liC',
					balance: 1000,
					CardNumber: 13200000001,
				},
				{
					logo: require('@/assets/logs5.png'),
					bglogo: require('@/assets/logs25.png'),
					title: 'Walmart',
					bgImg: 'bgD',
					liImg: 'liD',
					balance: 1000,
					CardNumber: 13200000001,
				},
			],
			// 预购商品清单
			detailed: [
				{
					Images: require('@/assets/germany/1.png'),
					Name: 'Kölln Bio Dinkelkorn Flocken',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/2.png'),
					Name: 'Kölln Müsli Knusper Schoko & Keks Vorratspack',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/3.png'),
					Name: 'Listerine Mundspülung Cool Mint 600ml',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/4.png'),
					Name: 'NIVEA Men Duschgel Sport 3in1',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/5.png'),
					Name: 'NIVEA Soft Creme Dose',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/6.png'),
					Name: 'Schwarzkopf Schauma Shampoo 7-Kräuter',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/7.png'),
					Name: 'Coca-Cola Zero Sugar',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/8.png'),
					Name: 'Pfanner Ice Tea Waldbeere',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/9.png'),
					Name: 'REWE Beste Wahl Ananassaft',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/10.png'),
					Name: 'REWE Bio Zitronensaft Direktsaft',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/11.png'),
					Name: 'Barilla Pasta Nudeln Maccheroni n.44',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/12.png'),
					Name: 'Zewa Wisch&Weg Leicht Haushaltstücher 4x48 Blatt',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/13.png'),
					Name: 'BioGourmet Bio Dinkel Mini Brezel',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/14.png'),
					Name: 'Ganze Walnüsse',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/15.png'),
					Name: 'Hans Freitag Desiree Waffelmischung',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/16.png'),
					Name: 'Haribo Fruchtgummi Pfirsich',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/17.png'),
					Name: 'Lorenz Crunchips Cheese & Onion',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/18.png'),
					Name: 'Lorenz Naturals Kartoffelchips Rosmarin',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/19.png'),
					Name: 'Milka Schokolade Alpenmilch',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/20.png'),
					Name: 'nimm2 Lachgummi',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/21.png'),
					Name: 'REWE Beste Wahl Soft Muffin Cookies',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/22.png'),
					Name: 'REWE Bio Bananenchips gesüßt',
					Price: '',
					Number: 1,
				},
				{
					Images: require('@/assets/germany/23.png'),
					Name: 'REWE Bio Hafercookie',
					Price: '',
					Number: 1,
				},
			],
			// 优惠卷详情页面信息
			Coupon: [
				{
					couponCode: '202212240011343434',
					couponName: 'Superhii Market',
					discountAmount: '25.00',
					validType: 1,
					promptType: null,
					promptStr: null,
					validGoodsCode: null,
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:13:53',
					couponRule: '100.00',
					status: 1,
					goodsName: null,
				},
				{
					couponCode: '202212240014141414',
					couponName: '$3 off',
					discountAmount: '3.00',
					validType: 2,
					promptType: 1,
					promptStr: '6900000000001',
					validGoodsCode: '6900000000002',
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:21:19',
					couponRule: null,
					status: 1,
					goodsName: 'Ranch Flavored Tortilla Chips',
				},
				{
					couponCode: '202212240022232323',
					couponName: '$1 off',
					discountAmount: '1.00',
					validType: 2,
					promptType: 2,
					promptStr: 'yhq',
					validGoodsCode: '6900000000011',
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:23:20',
					couponRule: null,
					status: 1,
					goodsName: 'Coca-Cola',
				},
				{
					couponCode: '20221224002407077',
					couponName: '$10 off over 30',
					discountAmount: '10.00',
					validType: 1,
					promptType: null,
					promptStr: null,
					validGoodsCode: null,
					startDate: '2022-10-31',
					endDate: '2023-01-27',
					createdTime: '2022-12-24 00:25:03',
					couponRule: '30.00',
					status: 1,
					goodsName: null,
				},
				{
					couponName: '$5 off',
					discountAmount: '5.00',
					startDate: '2022/12/18',
					endDate: '2022/12/21',
					goodsName: 'Coca-Cola',
				},
			],
		};
	},
	computed: {},
	watch: {
		showPage: {
			/* eslint-disable */
			handler(newVal) {
				if (
					newVal !== 'memberNum' &&
					newVal !== 'pay' &&
					newVal !== 'memberCardDetails'
				) {
					this.gray = false;
				}
			},
		},
	},
	mounted() {
		this.separate();

		if (window.history && window.history.pushState) {
			history.pushState(null, null, document.URL);
			window.addEventListener('popstate', this.clickBack);
		}
	},
	destroyed() {
		window.removeEventListener('popstate', this.clickBack);
	},
	methods: {
		back() {
			this.$router.push({ name: 'A' });
		},
		// 会员卡每四位数字分隔
		separate() {
			for (let i = 0; i < this.list.length; i++) {
				this.list[i].CardNumber = this.list[i].CardNumber.toString().replace(
					/(\d)(?=(\d{4})+$)/g,
					'$1 '
				);
			}
		},
		// 回到顶部
		topBtn() {
			this.$refs.scrollRef.scrollTop = 0;
		},
		// 点击更多
		clickMore() {
			this.showPopover = true;
		},
		// 更多 选项
		selectMore(action) {
			if (action.id == 0) {
				navigator.mediaDevices.getUserMedia({
					audio: true,
					video: { facingMode: { exact: 'environment' } },
				});
			} else if (action.id == 1) {
				window.sessionStorage.removeItem('superhiiCache');
				this.$router.replace('/');
			}
		},
		// 点击会员卡
		clickLi(item) {
			this.title = item.title + ' membership card';
			this.showPage = 'memberCardDetails';
			this.beforePage = 'list';
			this.item = item;
			this.gray = true;
			this.topBtn();
		},
		// 点击会员二维码
		clickMemberNum() {
			this.title = 'Membership Card No';
			this.showPage = 'memberNum';
			this.gray = true;
		},
		// 点击支付
		clickPay() {
			this.title = 'SCAN CODE FOR PAYMENT';
			this.showPage = 'pay';
			this.gray = true;
		},
		// 优惠券
		clickCoupon() {
			this.title = 'Coupons';
			this.showPage = 'coupon';
			this.couponType = 0;
			this.topBtn();
		},
		// 账户储值
		clickStored() {
			this.title = 'Account value';
			this.showPage = 'storedValue';
		},
		// 账户储值-选择金额
		selectMoney(index, item) {
			this.moneyBtn = index;
			this.moneyValue = item.value;
		},
		// 账户储值-选择支付方式
		selectType(index) {
			this.typeBtn = index;
		},
		// 账户储值-支付
		clickPayment() {
			// this.item.balance += this.moneyValue;
			this.item.balance =
				parseInt(this.item.balance) + parseInt(this.moneyValue);
			this.showPage = 'paySuccess';
		},
		// 预购物清单
		clickShoppingList() {
			this.title = 'Pre shopping list';
			this.showPage = 'preList';
			this.topBtn();
		},
		// 返回主页
		clickHome() {
			// this.transitionName = 'slide-left';
			this.showPage = 'list';
			this.title = 'Super Go membership card';
			this.moneyValue = 50;
			this.moneyBtn = 0;
			this.typeBtn = 0;
			this.couponType = 0;
			this.topBtn();
		},
		// 优惠券详情
		clickDetails(e) {
			this.showCouponDetails = true;
			this.shopCouponDetails = this.Coupon[e];
		},
		// 返回列表
		clickBack() {
			this.gray = true;
			this.topBtn();
			if (this.showPage == 'list') {
			} else if (this.showPage == 'memberCardDetails') {
				// this.transitionName = 'slide-left';
				this.showPage = 'list';
				this.title = 'Super Go membership card';
			} else if (this.showPage == 'memberNum') {
				this.showPage = 'memberCardDetails';
				this.title = this.item.title + ' membership card';
			} else if (this.showPage == 'pay') {
				this.showPage = 'memberCardDetails';
				this.title = this.item.title + ' membership card';
			} else if (this.showPage == 'storedValue') {
				// this.transitionName = 'slide-left';
				this.showPage = 'memberCardDetails';
				this.moneyValue = 50;
				this.moneyBtn = 0;
				this.typeBtn = 0;
				this.title = this.item.title + ' membership card';
			} else if (this.showPage == 'paySuccess') {
				// this.transitionName = 'slide-left';
				this.moneyValue = 50;
				this.moneyBtn = 0;
				this.typeBtn = 0;
				this.showPage = 'memberCardDetails';
				this.title = this.item.title + ' membership card';
			} else if (this.showPage == 'coupon') {
				// this.transitionName = 'slide-left';
				this.couponType = 0;
				this.showPage = 'memberCardDetails';
				this.title = this.item.title + ' membership card';
			} else if (this.showPage == 'preList') {
				// this.transitionName = 'slide-left';
				this.showPage = 'memberCardDetails';
				this.title = this.item.title + ' membership card';
			}
		},
	},
};
</script>

<style lang="scss" scoped>
// 上下
.v-enter {
	transform: translateY(-100%);
}
.v-leave-to {
	transform: translateY(-350%);
	// position: absolute;
}
.v-enter-active,
.v-leave-active,
.v-enter-active,
.v-leave-active {
	transition: 0.5s;
}
// 左右
.slide-left-enter {
	transform: translateX(-100%);
}
.slide-right-enter {
	transform: translateX(100%);
}
.slide-left-leave-to {
	transform: translateX(100%);
	position: absolute;
}
.slide-right-leave-to {
	transform: translateX(-100%);
	position: absolute;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
	transition: 0.5s;
}
.colorGray {
	background-color: #f6f6f6 !important;
}
.warpper {
	position: fixed;
	width: 750px;
	height: 100%;
	background: #fff;
	overflow-x: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
	img {
		width: 100%;
	}
	.bgCH {
		background-image: url(@/assets/BG21.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.bgHiCart {
		background-image: url(@/assets/bghicart-s.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.bgA {
		background-image: url(@/assets/BG22.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.bgB {
		background-image: url(@/assets/BG23.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.bgC {
		background-image: url(@/assets/BG24.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.bgD {
		background-image: url(@/assets/BG25.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liCH {
		background-image: url(@/assets/logBG21.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liHiCart {
		background-image: url(@/assets/logoBGhc.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liA {
		background-image: url(@/assets/logBG22.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liB {
		background-image: url(@/assets/logBG23.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liC {
		background-image: url(@/assets/logBG24.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.liD {
		background-image: url(@/assets/logBG25.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		display: flex;
	}
	.topBar {
		width: 100%;
		// height: 88px;
		height: 166px;
		padding: 31px 25px 29px 20px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.popover {
			margin-right: 10px;
		}
		.imgL {
			width: 44px;
			height: 44px;
			// margin-left: 20px;
		}
		.imgR {
			font-size: 60px !important;
			// width: 54px !important;
			// height: 44px;
			// margin-right: 20px;
		}
		.imgHome {
			width: 30px;
			// height: 44px;
			margin-right: 20px;
		}
		p {
			font-size: 36px;
			font-weight: bold;
			text-align: center;
			color: #000000;
		}
		.homeBtn {
			width: 48px;
			height: 100%;
			background-color: #fff;
			border: none;
			img {
				width: 100%;
			}
		}
	}
	.list {
		min-height: 900px;
		margin-bottom: 20px;
		// background-color: gray;
		// margin-top: 80px;
		ul {
			li {
				width: 678px;
				height: 240px;
				margin: 0 36px 20px 36px;
				img {
					width: 100%;
				}
				// align-items: center;
				.liL {
					width: 264px;
					height: 188px;
					margin-left: 40px;
					margin-top: 46px;
				}
				.liR {
					margin-left: 20px;
					margin-top: 64px;
					font-size: 26px;
					// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					font-weight: 500;
					color: #ffffff;
					text-shadow: 2px 3px 1px gray;
				}
			}
		}
	}
	.memberCardDetails {
		margin-top: -40px;
		.white-bg {
			background-color: #fff;
			padding-bottom: 40px;
			border-radius: 0px 0px 50px 50px;
		}
		.card {
			width: 678px;
			height: 400px;
			margin: 40px 36px 0 36px;
			flex-direction: column;
			border-radius: 36px;
			position: relative;
			.bgimg {
				width: 100%;
				position: relative;
			}
			.top {
				width: 99%;
				height: 148px;
				display: flex;
				margin: 40px 0 0 40px;
				// background-color: green;
				.left {
					width: 264px;
					height: 148px;
				}
				.right {
					margin-left: 20px;
					margin-top: 24px;
					// margin-top: 70px;
					font-size: 28px;
					// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
					font-weight: 500;
					text-shadow: 2px -2px 12px rgba(0, 0, 0, 0.2);
					color: #ffffff;
					p {
						font-size: 28px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #ffffff;
					}
				}
			}
			.bottom {
				margin-top: 104px;
				padding: 0 40px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				p {
					font-size: 32px;
					// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
					font-weight: bold;
					color: #ffffff;
					text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
				}
				.right {
					width: 108px;
					height: 108px;
				}
			}
		}
		.balance {
			width: 678px;
			height: 120px;
			background: #333333;
			border-radius: 38px;
			opacity: 1;
			margin: 20px 36px 0 36px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				font-size: 28px;
				// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
				font-weight: bold;
				color: #ffffff;
				padding-left: 40px;
			}
			.right {
				font-size: 36px;
				// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
				font-weight: bold;
				color: #17fc36;
				padding-right: 40px;
			}
		}
		.payment {
			width: 600px;
			height: 116px;
			background: #5393ce;
			border-radius: 38px;
			opacity: 1;
			margin: 40px 74px 0 76px;
			display: flex;
			justify-content: center;
			align-items: center;
			p {
				font-size: 32px;
				// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
				font-weight: bold;
				color: #ffffff;
			}
		}
		.menuList {
			width: 750px;
			height: 296px;
			margin-top: 40px;
			border-radius: 50px;
			opacity: 1;
			background-color: #fff;
			.menu {
				height: 95px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 50px;
				// background-color: #17fc36;
				.left {
					display: flex;
					align-items: center;
					img {
						width: 42px;
						height: 36px;
					}
					p {
						font-size: 28px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #333333;
						margin-left: 20px;
					}
				}
				div {
					img {
						height: 30px;
					}
				}
			}
			.line {
				width: 588px;
				opacity: 0.12;
				border: 1px solid #707070;
				margin: 0 48px 0 114px;
			}
		}
	}
	.memberNum {
		width: 100%;
		height: 630px;
		border-radius: 0px 0px 50px 50px;
		background-color: #fff;
		.card {
			width: 678px;
			height: 240px;
			margin: 0 36px 20px 36px;
			border-radius: 36px;
			.liL {
				width: 264px;
				height: 188px;
				margin-left: 40px;
				margin-top: 46px;
				img {
					width: 100%;
				}
			}
			.liR {
				margin-left: 20px;
				margin-top: 64px;
				font-size: 26px;
				// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
				font-weight: 500;
				color: #ffffff !important;
			}
		}
		.barcode {
			width: 422px;
			height: 210px;
			margin: 60px 176px 0 152px;
		}
	}
	.pay {
		background-color: #fff;
		border-radius: 0px 0px 50px 50px;
		.barcode {
			width: 422px;
			height: 210px;
			margin: 60px 176px 54px 152px;
		}
		.qrcode {
			width: 362px;
			height: 372px;
			margin: 0 204px 0 184px;
		}
		.balance {
			width: 750px;
			height: 116px;
			background: #333333;
			border-radius: 0px 0px 50px 50px;
			margin-top: 98px;
			display: flex;
			align-items: center;
			justify-content: center;
			.left {
				font-size: 28px;
				// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
				font-weight: bold;
				color: #ffffff;
			}
			.right {
				font-size: 36px;
				// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
				font-weight: bold;
				color: #17fc36;
			}
		}
	}
	.storedValue {
		width: 100%;
		height: 900px;
		padding: 0px 36px 0 36px;
		.lineTitle {
			font-size: 24px;
			// font-family: Source Han Sans CN-Normal, Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}
		.money {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			justify-content: space-between;
			margin-top: 22px;
			.item {
				width: 214px;
				height: 94px;
				background: #f5f5f5;
				border-radius: 20px 20px 20px 20px;
				opacity: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 20px;
				font-size: 32px;
				font-weight: bold;
				color: #333333;
			}
		}
		.type {
			display: flex;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			margin-top: 30px;
			.radioBox {
				width: 50%;
				height: 90px;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				margin-bottom: 20px;
				input {
					margin-right: 10px;
				}
			}
			// .item {
			// 	width: 329px;
			// 	height: 116px;
			// 	background: #f5f5f5;
			// 	border-radius: 28px 28px 28px 28px;
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// 	margin: 0 20px 0 0;
			// 	font-size: 28px;
			// 	// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			// 	font-weight: 500;
			// 	color: #333333;
			// }
		}
		.logo {
			height: 100px;
			img {
				width: 200px;
				height: 100px;
				padding: 10px;
			}
		}
		.typeBox {
			margin-top: 40px;
		}
	}
	.moneyBtnActived {
		background: #5393ce !important;
		color: #fff !important;
	}
	.moneyType {
		border: #f5f5f5 3px solid;
		border-radius: 30px;
		margin-left: 10px;
	}
	// .moneyTypeBtnActived {
	// 	border: #5393ce 1px solid;
	// }
	.bottomBtn {
		width: 100%;
		height: 116px;
		position: fixed;
		background: #999999;
		bottom: 0;
		p {
			font-size: 32px;
			// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
			font-weight: bold;
			color: #ffffff;
			line-height: 116px;
			text-align: center;
		}
	}
	.paySuccess {
		width: 100%;
		padding-top: 214px;
		font-size: 36px;
		// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
		font-weight: bold;
		color: #6ed014;
		text-align: center;
		img {
			width: 145px;
			height: 192px;
		}
	}
	.coupon {
		padding: 0 36px;
		// .van-tab {
		// 	width: 36%;
		// }
		.item {
			width: 678px;
			height: 282px;
			background-color: #fcf8f4 !important;
			background: url(@/assets/coupon-bg.png) no-repeat center right;
			background-size: 30% 80%;
			border-radius: 40px 40px 40px 40px;
			margin-top: 20px;
			.top {
				height: 70%;
				display: flex;
				flex-wrap: nowrap;
				// background-color: #17fc36;
				.left {
					width: 240px;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					// background-color: #999999;
					.icon {
						font-size: 34px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #e8372e;
					}
					.value {
						font-size: 56px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #e8372e;
					}
				}
				.middle {
					width: 235px;
					height: 100%;
					display: flex;
					align-content: space-around;
					flex-wrap: wrap;
					// background-color: #9f1999;
					p {
						width: 100%;
					}
					.midd-top {
						width: 100%;
					}
					.midd-bottom {
						width: 100%;
					}
					.black {
						font-size: 22px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #000000;
					}
					.red {
						font-size: 18px;
						// font-family: Source Han Sans CN-Normal, Source Han Sans CN;
						font-weight: 400;
						color: #e8372e;
					}
				}
				.right {
					width: 205px;
					height: 100%;
					// background-color: #e8372e;
					.green {
						width: 202px;
						height: 58px;
						background: rgba(255, 255, 255, 0.4);
						border-radius: 30px 30px 30px 30px;
						border: 4px solid #20c541;
						font-size: 20px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #20c541;
						text-align: center;
						line-height: 55px;
						margin-bottom: 10px;
					}
					.gray {
						width: 202px;
						height: 58px;
						background: rgba(255, 255, 255, 0.4);
						border-radius: 30px 30px 30px 30px;
						border: 4px solid #999999;
						font-size: 20px;
						// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
						font-weight: 500;
						color: #999999;
						text-align: center;
						line-height: 55px;
					}
				}
			}
			.line {
				width: 668px;
				height: 0px;
				border: 1px dashed #ece5dd;
			}
			.bottom {
				height: 30%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				// background-color: orange;
				.left {
					display: flex;
					p {
						font-size: 18px;
						// font-family: Source Han Sans CN-Normal, Source Han Sans CN;
						font-weight: 400;
						// color: #e8372e;
					}
					.left {
						color: #000 !important;
					}
				}
			}
		}
		.details {
			margin: 60px 20px 0 22px;
			.block {
				margin-bottom: 30px;
				.title {
					font-size: 26px;
					// font-family: Source Han Sans SC-Light, Source Han Sans SC;
					font-weight: 300;
					color: #999999;
					margin-bottom: 10px;
				}
				.content {
					width: 708px;
					height: 66px;
					background: #f2f2f2;
					border-radius: 56px 56px 56px 56px;
					line-height: 66px;
					padding-left: 30px;
					font-size: 24px;
					// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
					font-weight: bold;
					color: #000000;
				}
				.big-content {
					width: 708px;
					height: 358px;
					background: #f2f2f2;
					border-radius: 34px 34px 34px 34px;
					padding: 40px 30px 0 30px;
					font-size: 24px;
					// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
					font-weight: bold;
					color: #000000;
				}
			}
		}
		.expiredTips {
			font-size: 22px;
			// font-family: Source Han Sans CN-Normal, Source Han Sans CN;
			font-weight: 400;
			color: #999999;
		}
		::v-deep .van-tabs__line {
			width: 22px !important;
			background-color: #5393ce;
		}
		::v-deep .van-tab__text {
			font-size: 26px;
			// font-family: Source Han Sans CN-Medium, Source Han Sans CN;
			font-weight: 500 !important;
			color: #999999;
		}
		::v-deep .van-tab--active {
			span {
				color: #5393ce !important;
				// transform: translateX(101.5px) translateX(-50%);
			}
		}
	}
	.preList {
		.item {
			width: 678px;
			height: 184px;
			background: #f9f9f9;
			border-radius: 40px 40px 40px 40px;
			display: flex;
			align-items: center;
			padding: 0 20px;
			margin: 0 36px 20px 36px;
			.left {
				width: 144px;
				height: 144px;
				.center {
					background-color: #fff;
					border-radius: 32px;
					display: flex;
					align-items: center;
					justify-content: center;
					// flex-shrink: 0;
					// width: 144px;
					// height: 144px;
					img {
						width: 144px !important;
						height: 144px !important;
						object-fit: contain;
					}
				}
			}
			.right {
				flex: 1;
				display: flex;
				flex-wrap: wrap;
				margin: 0px 0 0 14px;
				height: 144px !important;
				.top {
					width: 100%;
					height: 120px;
					display: flex;
					justify-content: space-between;
					.top-l {
						width: 384px;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 5;
						display: -webkit-box;
						font-size: 22px;
						// font-family: Source Han Sans CN-Normal, Source Han Sans CN;
						font-weight: 400;
						color: #000000;
					}
					.top-r {
						font-size: 24px;
						// font-family: Source Han Sans CN-Bold, Source Han Sans CN;
						font-weight: bold;
						color: #000000;
					}
				}
				.bottom {
					width: 100%;
					height: 40px;
					display: flex;
					justify-content: flex-end;
					margin-top: 30px;
					.icon {
						font-size: 24px;
						// font-family: Source Han Sans CN-Regular, Source Han Sans CN;
						font-weight: 400;
						color: #000000;
						margin: 3px 5px 0 0;
					}
					p {
						font-size: 28px;
						// font-family: Source Han Sans SC-Bold, Source Han Sans SC;
						font-weight: bold;
						color: #000000;
					}
				}
			}
		}
	}
}
</style>
