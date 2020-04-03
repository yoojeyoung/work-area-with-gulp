const pkg = require('./package.json');

module.exports = {
  server: {
    port: 8888,
    open: false,
    index: '/cl.html'
  },
  path: {
    src: {
      html: [
        "dev/**/*.pug",
        "!dev/**/{_*,_*/**}"
      ],
			pug: [
        "dev/**/*.pug"
      ],
      css: [
        "dev/**/*.scss",
        "!dev/**/{_*,_*/**}"
      ],
      scss: [
        "dev/**/*.scss"
      ],
      js: [
        "dev/**/*.js",
        "!dev/**/{_*,_*/**}",
        "!dev/**/*.es.js"
      ],
      esjs: [
        "dev/**/*.es.js"
      ],
      images: [
        "dev/**/*.{jpg,png,gif}",
        "!dev/**/{_*,_*/**}"
      ]
    },
    dest: "www/",
    etc: [
      "dev/**/*",
      "!dev/**/{_*,_*/**,*.pug,*.scss,*.sass,*.js,*.jpg,*.png,*.gif}"
    ],
    unnecessary_folder: [
      "www/es_maps/",
      "www/sass_maps/"
    ],
    backup: [
      "**/*",
      "!node_modules",
      "!node_modules/**/*",
      "!__etribe_ux",
      "!__etribe_ux/**/*"
    ]
  },
	sprite: {
		src:{
			sprite_mobile: "dev/images/sprite_mobile/**/*",
			sprite_pc: "dev/images/sprite_pc/**/*"
		},
		dest:{
			sprite_img_mobile: "dev/images/common",
			sprite_css_mobile: "dev/inc/css/",
			sprite_img_pc: "dev/images/common",
			sprite_css_pc: "dev/inc/css/"
		},
		mobile: {
			imgPath: "../../images/common/sprite_mobile.png",
			imgName: "sprite_mobile.png",
			cssName: "_sprite_mobile.scss",
			retinaSrcFilter: "dev/images/sprite_mobile/*@2x.png",
			retinaImgPath: "../../images/common/sprite_mobile@2x.png",
			retinaImgName: "sprite_mobile@2x.png"
		},
		pc: {
			imgPath: "../../images/common/sprite_pc.png",
			imgName: "sprite_pc.png",
			cssName: "_sprite_pc.scss"
		}
	},
  ftpOptions: {
    user: "etraux",
    pass: "dlxmfkdlqmux",
    host: "uxdev.etribe.co.kr",
    remotePath: '/uxdev.etribe.co.kr/' + pkg.name
  }
}
