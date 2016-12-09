(function(doc){"use strict";var newsletterForm=doc.getElementById("newsletterForm");var isHidden=false;var isArticle=false;if(!newsletterForm){return}else{if(mdn.features.localStorage){isHidden=localStorage.getItem("newsletterHide")==="true"?true:false}if(doc.querySelector(".wiki-block-newsletter")){isArticle=true}if(!mdn.features.localStorage||!isArticle){newsletter()}else if(isArticle&&!isHidden){newsletter();newsletterAddHideButton()}else if(isArticle&&isHidden){newsletterHide()}}function newsletter(){var newsletterEmailInput=doc.getElementById("newsletterEmailInput");var newsletterPrivacy=doc.getElementById("newsletterPrivacy");var errorArray=[];var newsletterErrors=doc.getElementById("newsletterErrors");function newsletterError(){if(errorArray.length){showFormErrors(errorArray)}else{newsletterForm.setAttribute("data-skip-xhr",true);newsletterForm.submit()}}function showFormErrors(errorArray){var errorList=doc.createElement("ul");errorList.className="errorlist";for(var i=0,l=errorArray.length;i<l;i++){var item=doc.createElement("li");item.appendChild(doc.createTextNode(errorArray[i]));errorList.appendChild(item)}newsletterErrors.appendChild(errorList);$(newsletterErrors).removeClass("hidden");mdn.analytics.trackEvent({category:"newsletter",action:"progression",label:"error"})}function newsletterThanks(){var thanks=doc.getElementById("newsletterThanks");$(thanks).removeClass("hidden");mdn.analytics.trackEvent({category:"newsletter",action:"progression",label:"complete"});newsletterSaveHide()}function newsletterSubscribe(event){var skipXHR=newsletterForm.getAttribute("data-skip-xhr");if(skipXHR){mdn.analytics.trackEvent({category:"newsletter",action:"progression",label:"error-forward"});return true}event.preventDefault();event.stopPropagation();mdn.analytics.trackEvent({category:"newsletter",action:"progression",label:"submission"});errorArray=[];$(newsletterErrors).addClass("hidden");while(newsletterErrors.firstChild){newsletterErrors.removeChild(newsletterErrors.firstChild)}var fmt=doc.getElementById("fmt").value;var email=newsletterEmailInput.value;var newsletter=doc.getElementById("newsletterNewslettersInput").value;var privacy=doc.querySelector('input[name="privacy"]:checked')?"&privacy=true":"";var params="email="+encodeURIComponent(email)+"&newsletters="+newsletter+privacy+"&fmt="+fmt+"&source_url="+encodeURIComponent(doc.location.href);var xhr=new XMLHttpRequest;xhr.onload=function(r){if(r.target.status>=200&&r.target.status<300){if(response===null){newsletterError(new Error);return}var response=r.target.response;if(response.success===true){$(newsletterForm).addClass("hidden");newsletterThanks()}else{if(response.errors){for(var i=0,l=response.errors.length;i<l;i++){errorArray.push(response.errors[i])}}newsletterError(new Error)}}else{newsletterError(new Error)}};xhr.onerror=function(event){newsletterError(event)};var url=newsletterForm.getAttribute("action");xhr.open("POST",url,true);xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.timeout=5e3;xhr.ontimeout=newsletterError;xhr.responseType="json";xhr.send(params);return false}newsletterForm.addEventListener("submit",newsletterSubscribe,false);newsletterEmailInput.addEventListener("focus",function(){$(newsletterPrivacy).removeClass("hidden");mdn.analytics.trackEvent({category:"newsletter",action:"prompt",label:"focus"})},false)}function newsletterAddHideButton(){var $hideButton=$("#newsletterHide");$hideButton.removeClass("hidden");$hideButton.on("click",newsletterHandleHideClick)}function newsletterHide(){var $wikiBlock=$(".wiki-block-newsletter");$wikiBlock.addClass("hidden")}function newsletterSaveHide(){localStorage.setItem("newsletterHide",true)}function newsletterHandleHideClick(){newsletterHide();newsletterSaveHide();mdn.analytics.trackEvent({category:"newsletter",action:"prompt",label:"hide"})}})(document);