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
                                                                        style: "width: 400px",
                                                                        closable: false});
                            var nonce = dojo.cookie('token');
                            if(lconn.communities.bizCard && lconn.communities.bizCard.core && lconn.communities.bizCard.core.community){
                                lconn.communities.bizCard.core.community.memberJoinURL = "/communities/service/html/memberjoinsubmit?communityUuid=" + "10d48e8a-ee5a-47c8-b6aa-497a72dda53f";
                            }
                            //"X-Update-Nonce"
                            if(myAgreementTermsDlg.containerNode.innerHTML == ""){
                                var border = dojo.create("div", {class:"lotusDialogBorder"}, myAgreementTermsDlg.containerNode);
                                var lotusDialog = dojo.create("div", {class:"lotusDialog"}, border);
                                var lotusDialogHeader = dojo.create("div", {class:"lotusDialogHeader", innerHTML:'<h1 class="lotusHeading" data-dojo-attach-point="titleNode">Agreement Terms</h1>'}, lotusDialog);
                                var lotusDialogContent = dojo.create("div", {class:"lotusDialogContent", style:{padding-right: "0px", padding-bottom: "0px", width: "auto", height: "auto"}, data-dojo-attach-point:"gadgetNode", innerHTML:'Test content.....<br>'}, lotusDialog);
                                dojo.create("a", { href: "javascript:lconn.communities.bizCard.core.joinComm();myAgreementTermsDlg.hide();", role: "button", title: "Approve to Join", innerHTML: "Join to community" }, lotusDialogContent);
                            }
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
