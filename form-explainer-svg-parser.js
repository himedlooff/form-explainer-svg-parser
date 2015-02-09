var fs = require('fs'),
    jsdom = require('jsdom'),
    jquery = fs.readFileSync( './node_modules/jquery/dist/jquery.js', 'utf-8' ).toString();

var files = process.argv.splice( 2, process.argv.length - 2 ),
    totalFiles = files.length;
    totalFilesWritten = 0;

var read = function () {
  console.log( 'Files to convert:', files.length );
  files.forEach( function ( e, i ) {
    console.log( 'Reading:', e );
    var f = fs.readFileSync( e, 'utf8' );
    files[ i ] = {
      name: e,
      data: f,
      parsedData: []
    };
    if ( i == (files.length - 1) ) parse();
  });
};

var parse = function () {
    var len = files.length;
    while ( files.length > 0 ) {
      (function ( f ) {
        console.log( 'Parsing:', f.name );
        jsdom.env({
          html: f.data,
          src: [ jquery ],
          done: function ( errors, window ) {
            var $ = window.$,
                $rectangles = $( $('rect').get().reverse() ),
                viewbox = $('svg').get(0).getAttribute('viewBox').split(' '),
                width = viewbox[ 2 ],
                height = viewbox[ 3 ];
            $rectangles.each( function ( i, e ) {
              var $rectangle = $( e );
              f.parsedData.push({
                term: '',
                definition: '',
                id: $rectangle.attr('id').split('_x5F_')[ 1 ],
                category: $rectangle.attr('id').split('_')[ 0 ],
                left: percent( $rectangle.attr('x'), width ),
                top: percent( $rectangle.attr('y'), height ),
                width: percent( $rectangle.attr('width'), width ),
                height: percent( $rectangle.attr('height'), height )
              });
            });
            write( f );
          }
        });
      })( files.shift() );
    }
};

var write = function ( f ) {
  var filename = f.name.replace( '.svg', '' ) + '.json';
  console.log( 'Writing:', filename );
  fs.writeFile( filename, JSON.stringify( f.parsedData, null, 4 ), function( err ) {
      if ( err ) {
          console.log( err );
      } else {
          console.log( filename, 'was saved.' );
      }
      totalFilesWritten += 1;
      exitApp();
  });
};

var exitApp = function () {
  if ( totalFilesWritten === files.length ) {
    process.exit( 0 );
  }
};

var percent = function ( part, whole ) {
  return parseFloat( parseInt( part, 10 ) / whole * 100 ).toFixed( 2 ) + '%';
};

// Require at least one argument before beginning
console.log(process.argv.length);
if ( process.argv.length < 2 ) {
  console.log( 'You must pass at least one argument to form-explainer-svg-parser.js\n' +
               'Example: node form-explainer-svg-parser.js my-file.svg' );
  process.exit( 9 );
} else {
  read();
}
