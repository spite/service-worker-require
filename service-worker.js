this.addEventListener('fetch', function(event) {

  if( event.request.url.indexOf('.js') !== -1 ) {

    var p = new Promise( function (resolve, reject ) {

      fetch( event.request ).then( function( res ) {
        return res.text()
      } ).then( function( str ) {

          var result = str;

          var re = /require[\s]*\([\s]*'([\S]+)'[\s]*\)/gmi; 
          var m;

          var matches = [];
          while ((m = re.exec(str)) !== null) {

            if (m.index === re.lastIndex) {
              re.lastIndex++;
            }

            matches.push( { match: m[ 0 ], module: m[ 1 ] } );
          
          }

          var dependencies = [];

          matches.forEach( function( m ) {

            var p = new Promise( function( resolve, reject ) { 

              var f = fetch( 'modules/' + m.module + '/index.js' );

              f.then( function( res ) {
                res.text().then( function( txt ) {
                  result = result.replace( m.match, '( function() {' + "\r\n" + 'var module = { exports: {} }; exports = module.exports; ' + "\r\n" + txt + ';' + "\r\n" + 'return module.exports; } )()' );
                  resolve();
                } )
              } );
            
            });

            dependencies.push( p );

          })

          Promise.all( dependencies ).then( function() {
            var r = new Response( result );
            resolve( r );
          } );
          
      } );

    } );

    event.respondWith( p );
    
  } else {
    event.respondWith(
      fetch(event.request)
    );
  }

});
