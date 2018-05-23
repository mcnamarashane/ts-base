const net= require('net');
const tls = require('tls');
const fs = require('fs');


class Main {

    private cliToConfig(params : any) : Config {

        return {url: params["_"][0], httpData: params['d'], httpVerb:params['X']};

    }

    private getHttpMessage(config : Config) : string {
        const url=config.url;
        const split=url.split('//',3);
        const sp2=split[1];
        console.log('sp2'+sp2);
        const split2=sp2.split('.',3);
        const sp3=split2[1];
        console.log(sp3);
        if(config.httpVerb=='POST'){
            return "POST "+config.url+" HTTP/1.1\n\n";

        }
        else {
            return "GET " + config.url + " HTTP/1.1\n\n";
        }
    }

    private writeMessage(message : string) : string {

        // detect if HTTPs, then use https://nodejs.org/api/tls.html#tls_tls_connect_options_callback
        console.log(message);
        const split=message.split(' ',3);
        console.log(split);
        const url=split[1];
        console.log(url);
        const split2=url.split('/',3);
        console.log(split2[0]);
        if(split2[0]=="https:"){
            console.log("has https");
            const host = split2[2];
            console.log(host)
            console.log(message);
            const s = net.Socket();
            s.connect(443, host);
            const options = {
                host:host,
                socket:s,
            };
            //console.log(options);
            const socket = tls.connect( options, function(){
                console.log('client connected',
                    socket.authorized ? 'authorized' : 'unauthorized');
                console.log('tls');
            });
             socket.write(message);
            socket.on('data', function (d: any) {
               // console.log(d.toString());
            });
            socket.end();
        }
        else {
            const host = split2[2];
            console.log(message);
            const s = net.Socket();
            s.connect(80, host);
            s.write(message);
            s.on('data', function (d: any) {
                console.log(d.toString());
            });
            s.end();
        }
        /**
         * Socket example:
         * var s = socket.Socket();
         s.connect(80, 'google.com');
         s.write('GET http://www.google.com/ HTTP/1.1\n\n');

         s.on('data', function(d){
    console.log(d.toString());
});
         s.end();
         */
        return ""
    }

    public Main(params : any) : void {
        console.log("it worked!");
        console.log(params);
        console.log(this.cliToConfig(params));
        const con=this.cliToConfig(params);
        console.log(this.getHttpMessage(con));
        const message=this.getHttpMessage(con);
        console.log(this.writeMessage(message));

    }
}

const parsedParams : any = require('minimist')(process.argv.slice(2));
(new Main()).Main(parsedParams);

interface Config {
    url : string;
    httpVerb : "GET" | "POST";
    httpData : string;
}

/**
 Parse the command line arguments, recognize url and switching to POST *
 Add a function to get the HTTP message that you need to send *
 Fetch the URL
 Open socket
 Write message
 Get data back
*/
