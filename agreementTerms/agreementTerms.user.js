// ==UserScript==
// @copyright    Copyright IBM Corp. 2018
//
// @name         Agreement Terms Sample
// @version      0.1
// @description  *** PROTOTYPE CODE *** demonstrates simple hello world script to customize the Home Page
//
// @namespace  http://ibm.com
//
// @author       htamura
//
// @include      *://apps.ap.collabserv.com/homepage/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if(typeof(dojo) != "undefined") {
    require(["dojo/domReady!"], function(){
        try {
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                    clearInterval(intId);
                    if( waitInter >= maxInter) { 
                        console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback();
                    }
                }, waitTime);
            };

            // here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
            // before we proceed to customize the page...
            waitFor( function(){
            // wait until the "loading..." node has been hidden
            // indicating that we have loaded content.
                //Call xhr to get communities joined
                var xhrArgs = {
                    url: "/search/atomfba/mysearch?scope=communities%3Aentry&scope=personalOnly&query=" + "test001",
                    handleAs: "xml",
                    load: function(data){
                    // Replace newlines with nice HTML tags.
                        var nodes = data.getElementsByTagName("entry");
                        if(nodes && nodes.length > 0){
                            console.log("already joined the community");
                        } else {
                            var myAgreementTermsDlg = new dijit.Dialog({id: "myAgreementTermsDlg",
                                                                        title: "Agreement Terms",
                                                                        content: "Test content.....",
                                                                        style: "width: 300px",
                                                                        closable: false});
                            var nonce = dojo.cookie('token');
                            lconn.communities.bizCard.core.community.memberJoinURL = "/communities/service/html/memberjoinsubmit?communityUuid=" + "10d48e8a-ee5a-47c8-b6aa-497a72dda53f";
                            //"X-Update-Nonce"
                            dojo.create("a", { href: "javascript:lconn.communities.bizCard.core.joinComm();myAgreementTermsDlg.hide();", role: "button", title: "Approve to Join", innerHTML: "Join to community" }, myAgreementTermsDlg.containerNode);
                            myAgreementTermsDlg.show();
                        }
                    },
                    error: function(error){
                        console.log("An unexpected error occurred: " + error);
                    }
                }
                // Call the asynchronous xhrGet
                var deferred = dojo.xhrGet(xhrArgs);
            },
            ".lotusStreamTopLoading div.loaderMain.lotusHidden");
        } catch(e) {
            alert("Exception occurred in helloWorld: " + e);
        }
   });
}
