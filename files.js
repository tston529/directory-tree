// Searches for elt by class name, toggles visibility
//  of all its children ( used in directory tree )
function toggleShowFolder(folderClass) {
    var folder = $("."+folderClass);
    var buttonClass = folderClass.toUpperCase();
    if(folder.css( "display" ) == "none") {
        folder.css( "display", "block" );
        $("."+buttonClass).html($("."+buttonClass).html().replace("+", "-"));
    }
    else {
        folder.css( "display", "none" );
        $("."+buttonClass).html($("."+buttonClass).html().replace("-", "+"));
    }
}

// Creates a directory tree based on a list of full paths to files
function organizeFiles(os_slash) {
    var $files = $("#files");
    var names = $files.children().filter("a");
    $files.html('');
    var homeDiv = $("<div class='home' style='display:none; margin-left:20px;'></div><br>").append("<br>");
    $files.append(homeDiv);
    $(".home").before($("<button class='HOME' onclick='toggleShowFolder(\"home\");'>[+] home</button>"));

    for (var i = 0; i < names.length; i++) {
        var full_path = $(names[i]).html().split(os_slash);
        full_path.unshift('home');
        var fn = $(full_path).get(-1);
        $(names[i]).html(fn);
        full_path.pop();
        var indentation = 0;// Will be used to shift folders/contents
                            //   to make the list look more 'tree-like'

        // Ensures all "folders" are created
        for (var j = 1; j < full_path.length; j++) {
            indentation += 40;
            // Search for subfolder in current folder
            // Create 'folder' div if not found
            if ( $("."+full_path.slice(0, j).join('')).find("."+full_path.slice(0, j+1).join('')).length == 0 ) {
                var newClass = full_path.slice(0, j+1).join('');
                var newDiv = $("<div class='"+newClass+
                            "' style='display:none; margin-left: "+indentation+"px;'></div>").append("<br>");
                $("."+full_path.slice(0, j).join('')).append(newDiv);
                var newButton = $("<br><button class='"+newClass.toUpperCase() +
                                    "' onclick='toggleShowFolder(\""+newClass+"\");'>"
                                    + "[+] " + full_path[j] + "</button><br/>");
                newDiv.before(newButton);
            }
        }
        
        // Put the file at the beginning of the files list, not after any
        //  other folders that may have been created in the meantime.
        var $last_a = $("."+full_path.join('')).children("a").nextUntil("button");
        if ($last_a.length){
            $last_a.parent().prepend($(names[i])).prepend("<br>");
        }
        else
            $("."+full_path.join('')).append($(names[i])).append("<br>");
    }
}

// On page load:
//  --Create directory tree
$(document).ready(function(){
    let os_slash = "/";
    if (window.navigator.userAgent.indexOf("Windows")!= -1)
        os_slash = "\\";
    organizeFiles(os_slash); // Create directory tree

    // Allow for loading of files via ajax
    $('.file').click(function (e) {
        e.preventDefault();
        var filename = $(this).attr("href");
        $('.editing').removeClass("editing");
        $(this).addClass("editing");
    });
    
});
