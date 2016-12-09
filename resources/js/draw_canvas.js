function draw(Icons_Styles, selectedIcons_List, icon_size, bg_size) {
    /*console.log(JSON.stringify(Icons_Styles));*/
    $.each(Icons_Styles, function(key, item) {
        var canvas_icon = Icons_Styles[key].toString();
        canvas_name = key;
        canvas_shape = Icons_Styles[key][0][0];
        canvas_angle = Icons_Styles[key][0][1];
        canvas_depth = Icons_Styles[key][0][2];
        canvas_bg_clr = Icons_Styles[key][0][3];
        canvas_shadow_clr = Icons_Styles[key][0][4];
        canvas_icon_clr = Icons_Styles[key][0][5];
        canvas_icon_id = Icons_Styles[key][0][6];
        canvas_left_pos = Icons_Styles[key][0][7];
        canvas_top_pos = Icons_Styles[key][0][8];
        canvas_icon_size = parseInt(icon_size.split('px')[0]);
        canvas_bg_size = parseInt(bg_size.split('px')[0]);
        canvas = document.createElement('canvas');
        div = document.getElementById('canvas_draw');
        canvas.id = canvas_name;
        var canvasCenter = canvas_bg_size / 2;
        canvas_left_pos = parseInt(canvas_left_pos) + canvasCenter - canvas_icon_size / 2 - canvas_icon_size / 10;
        canvas_top_pos = parseInt(canvas_top_pos) + canvasCenter + canvas_icon_size / 2 - canvas_icon_size / 10;
        canvas.width = canvas_bg_size;
        canvas.height = canvas_bg_size;
        canvas.style.zIndex = 1;
        canvas.style.position = "relative";
        div.appendChild(canvas);
        if (canvas.getContext) {
            ctx = canvas.getContext("2d");
            ctx.globalAlpha = parseFloat(canvas_bg_clr.split(',')[3].split(')')[0]);
            console.log(parseFloat(canvas_bg_clr.split(',')[3].split(')')[0]));
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = canvas_bg_size / 2;
            if (canvas_shape == "50%") {
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = canvas_bg_clr;
                ctx.fill();
            } else if (canvas_shape == "0%") {
                ctx.rect(0, 0, canvas_bg_size, canvas_bg_size);
                ctx.fillStyle = canvas_bg_clr;
                ctx.fill();
            } else {
                canvas_shape = (canvas_shape * 130) / 100;
                roundRect(ctx, 0, 0, canvas_bg_size, canvas_bg_size, 50, canvas_bg_clr, false);
            }
            ctx.clip();
            ctx.font = canvas_icon_size + "px FontAwesome";
            ctx.globalAlpha = parseFloat(canvas_shadow_clr.split(',')[3].split(')')[0]);
            console.log(parseFloat(canvas_shadow_clr.split(',')[3].split(')')[0]));
            ctx.fillStyle = canvas_shadow_clr.split(',')[0].replace('rgba', 'rgb') + ',' + canvas_shadow_clr.split(',')[1] + ',' + canvas_shadow_clr.split(',')[2] + ')';
            var shadow_x = 1.5 * Math.cos(canvas_angle * Math.PI / 180);
            var shadow_y = 1.5 * Math.sin(canvas_angle * Math.PI / 180);
            var canvas_num_x = shadow_x;
            shadow_x = shadow_x;
            var canvas_num_y = shadow_y;
        }
        for (var i = 1; i <= canvas_depth; i++) {
            ctx.fillText(String.fromCharCode("0x" + canvas_icon_id), shadow_x + canvas_left_pos, shadow_y + canvas_top_pos);
            shadow_x += canvas_num_x;
            shadow_y += canvas_num_y;
        }
        ctx.globalAlpha = parseFloat(canvas_icon_clr.split(',')[3].split(')')[0]);
        console.log(parseFloat(canvas_icon_clr.split(',')[3].split(')')[0]));
        ctx.fillStyle = canvas_icon_clr;
        ctx.fillText(String.fromCharCode("0x" + canvas_icon_id), canvas_left_pos, canvas_top_pos);
        var dataURL = canvas.toDataURL();
        var img = document.createElement("img");
        img.src = dataURL;
        img.id = key;
        var foo = document.getElementById('canvasImage');
        foo.appendChild(img);
    });
}
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    ctx.fillStyle = fill;
    ctx.fill();
}
