const socket = require('net').Socket();
const tls = require('tls');

class Main {

    private cliToConfig(params : any) : Config {

        return {url: params["_"][0], httpData: params["_"][1], httpVerb: "get"};

    }

    private getHttpMessage(config : Config) : string {

        return "GET "+config.url+" HTTP/1.1\n\n";

    }

    private writeMessage(message : string) : string {

        // detect if HTTPs, then use https://nodejs.org/api/tls.html#tls_tls_connect_options_callback
        var words=message.split(' ',5);
        var url=words[1];
        console.log(words);
        var split=url.split('.',3);
        console.log(split);
        var split2=split[1]+'.'+split[2].split('/',1);
        console.log(split2);
        var host=split2;
        var s = socket;
        s.connect(80,  host);
        s.write(message);
        s.end();
        s.on('data', function(d:any){
            console.log(d.toString());
        });
        s.end();
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
        return "";
    }

    public Main(params : any) : void {
        console.log("it worked!");
        //console.log(params);
        console.log(this.cliToConfig(params));
        var con=this.cliToConfig(params);
        console.log(this.getHttpMessage(con));
        var message=this.getHttpMessage(con);
        console.log(this.writeMessage(message));

    }
}

const parsedParams : any = require('minimist')(process.argv.slice(2));
(new Main()).Main(parsedParams);

interface Config {
    url : string;
    httpVerb : "get" | "post";
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
