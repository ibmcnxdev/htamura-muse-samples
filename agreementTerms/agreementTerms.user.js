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
                                                                        style: "width:600px;height:400px;",
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
                                var lotusDialogContent = dojo.create("div", {class:"lotusDialogContent"}, lotusDialog);
                                dojo.attr(lotusDialogContent, "data-dojo-attach-point", "gadgetNode");
                                if(lotusDialogContent.style){
                                    lotusDialogContent.style.paddingRight = "0px";
                                    lotusDialogContent.style.paddingBottom = "0px";
                                    lotusDialogContent.style.width = "auto";
                                    lotusDialogContent.style.height = "auto";
                                }
                                var myAgreementTerms = dojo.create("div", {style:{width:"530px", border:"1px", padding:"8px", height:"300px", overflow:"auto"}}, lotusDialogContent);
                                myAgreementTerms.textContent = '                                 Apache License' +
                                '                           Version 2.0, January 2004' +
                                '                        http://www.apache.org/licenses/' +
                                '' +
                                '   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION' +
                                '' +
                                '   1. Definitions.' +
                                '' +
                                '      "License" shall mean the terms and conditions for use, reproduction,' +
                                '      and distribution as defined by Sections 1 through 9 of this document.' +
                                '' +
                                '      "Licensor" shall mean the copyright owner or entity authorized by' +
                                '      the copyright owner that is granting the License.' +
                                '' +
                                '      "Legal Entity" shall mean the union of the acting entity and all' +
                                '      other entities that control, are controlled by, or are under common' +
                                '      control with that entity. For the purposes of this definition,' +
                                '      "control" means (i) the power, direct or indirect, to cause the' +
                                '      direction or management of such entity, whether by contract or' +
                                '      otherwise, or (ii) ownership of fifty percent (50%) or more of the' +
                                '      outstanding shares, or (iii) beneficial ownership of such entity.' +
                                '' +
                                '      "You" (or "Your") shall mean an individual or Legal Entity' +
                                '      exercising permissions granted by this License.' +
                                '' +
                                '      "Source" form shall mean the preferred form for making modifications,' +
                                '      including but not limited to software source code, documentation' +
                                '      source, and configuration files.' +
                                '' +
                                '      "Object" form shall mean any form resulting from mechanical' +
                                '      transformation or translation of a Source form, including but' +
                                '      not limited to compiled object code, generated documentation,' +
                                '      and conversions to other media types.' +
                                '' +
                                '      "Work" shall mean the work of authorship, whether in Source or' +
                                '      Object form, made available under the License, as indicated by a' +
                                '      copyright notice that is included in or attached to the work' +
                                '      (an example is provided in the Appendix below).' +
                                '' +
                                '      "Derivative Works" shall mean any work, whether in Source or Object' +
                                '      form, that is based on (or derived from) the Work and for which the' +
                                '      editorial revisions, annotations, elaborations, or other modifications' +
                                '      represent, as a whole, an original work of authorship. For the purposes' +
                                '      of this License, Derivative Works shall not include works that remain' +
                                '      separable from, or merely link (or bind by name) to the interfaces of,' +
                                '      the Work and Derivative Works thereof.' +
                                '' +
                                '      "Contribution" shall mean any work of authorship, including' +
                                '      the original version of the Work and any modifications or additions' +
                                '      to that Work or Derivative Works thereof, that is intentionally' +
                                '      submitted to Licensor for inclusion in the Work by the copyright owner' +
                                '      or by an individual or Legal Entity authorized to submit on behalf of' +
                                '      the copyright owner. For the purposes of this definition, "submitted"' +
                                '      means any form of electronic, verbal, or written communication sent' +
                                '      to the Licensor or its representatives, including but not limited to' +
                                '      communication on electronic mailing lists, source code control systems,' +
                                '      and issue tracking systems that are managed by, or on behalf of, the' +
                                '      Licensor for the purpose of discussing and improving the Work, but' +
                                '      excluding communication that is conspicuously marked or otherwise' +
                                '      designated in writing by the copyright owner as "Not a Contribution."' +
                                '' +
                                '      "Contributor" shall mean Licensor and any individual or Legal Entity' +
                                '      on behalf of whom a Contribution has been received by Licensor and' +
                                '      subsequently incorporated within the Work.';

                                dojo.create("a", { href: "javascript:lconn.communities.bizCard.core.community.memberJoinURL = '/communities/service/html/memberjoinsubmit?communityUuid=' + '10d48e8a-ee5a-47c8-b6aa-497a72dda53f';lconn.communities.bizCard.core.joinComm();myAgreementTermsDlg.hide();", role: "button", title: "I accept the terms of this agreement", innerHTML: "I accept the terms of this agreement" }, lotusDialogContent);
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
