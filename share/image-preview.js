'use strict';

Editor.registerElement({
  properties: {
    info: {
      type: String,
      value: 'Unknown',
    },

    path: {
      type: String,
      value: '',
      observer: '_pathChanged'
    },

    mtime: {
      type: Number,
      value: 0,
    },
  },

  _pathChanged: function () {
    if ( !this.path )
      return;

    this._image = new Image();
    this._image.onload = function () {
      this.info = this._image.width + ' x ' + this._image.height;
      this.resize();
    }.bind(this);
    this._image.src = this.path + '?' + this.mtime;
  },

  resize: function () {
    var bcr = this.$.content.getBoundingClientRect();
    var result = Editor.Utils.fitSize(
      this._image.width,
      this._image.height,
      bcr.width,
      bcr.height
    );
    this.$.canvas.width = Math.ceil(result[0]);
    this.$.canvas.height = Math.ceil(result[1]);

    //
    this.repaint();
  },

  repaint: function () {
    var ctx = this.$.canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    // TODO
    // if ( this.asset instanceof cc.Texture2D ) {
      ctx.drawImage( this._image, 0, 0, this.$.canvas.width, this.$.canvas.height );

      // var xRatio = this.$.canvas.width / this._image.width;
      // var yRatio = this.$.canvas.height / this._image.height;

      // if ( this.meta.subRawData ) {
      //   if ( this.meta.type === Fire.TextureType.Sprite ) {
      //     //for ( var subInfo of this.meta.subRawData ) {
      //     this.meta.subRawData.forEach(function(subInfo) {
      //       if ( subInfo.asset instanceof cc.SpriteFrame ) {
      //         ctx.beginPath();
      //         ctx.rect( subInfo.asset.trimX * xRatio,
      //               subInfo.asset.trimY * yRatio,
      //               subInfo.asset.width * xRatio,
      //               subInfo.asset.height * yRatio );
      //         ctx.lineWidth = 1;
      //         ctx.strokeStyle = '#ff00ff';
      //         ctx.stroke();
      //       }
      //     });
      //   }
      // }
    // }
    // else if ( this.asset instanceof cc.SpriteFrame ) {
    //   if ( this.rawTexture ) {
    //     ctx.drawImage( this.rawTexture.image,
    //             this.asset.trimX, this.asset.trimY, this.asset.width, this.asset.height,
    //             0, 0, this.$.canvas.width, this.$.canvas.height
    //            );
    //   }

    //   this.$.dragleft.style.display = 'block';
    //   this.$.dragtop.style.display = 'block';
    //   this.$.dragbottom.style.display = 'block';
    //   this.$.dragright.style.display = 'block';

    //   this.updateLine();
    // }
  },
});
