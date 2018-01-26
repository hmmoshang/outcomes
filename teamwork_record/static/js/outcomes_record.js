window.addEventListener('load', function () {
    var myDate = new Date();
    var year=myDate.getFullYear();
    //获取当前月
    var month=myDate.getMonth()+1;
    //获取当前日
    var date=myDate.getDate();
    var now=year+'-'+month+"-"+date;
    $('.date').text(now);
    var pnames = [];
    var pprojects = [];
    var pcontents = [];
    var phours = [];
    var pcounts = [];
    var target = document.querySelector('#target');
    target.addEventListener('dragenter', function () {
        this.classList.remove('hover');
    });
    target.addEventListener('dragleave', function () {
        this.classList.add('hover');
    });
    target.addEventListener('dragover', function (e) {
        this.classList.remove('hover');
        e.preventDefault();
    });
    target.addEventListener('drop', function (e) {
        e.preventDefault();
        handleDrop(e.dataTransfer.files[0]);
    }, false);
    var handleDrop = function (f) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                }),
                sheetName = workbook.SheetNames[0],
                sheet = workbook.Sheets[sheetName],
                table = document.createElement('table');

            function outcomes_record(name, project, content, during, total) {
                this.name = name;
                this.project = project;
                this.content = content;
                this.during = during;
                this.total = total;
            }

            for (var row = 1; ; row++) {
                if ((sheet['A' + row] == null) && (sheet['B' + row] == null)) {
                    break;
                }
                var tr = document.createElement('tr');
                var name = '' + String.fromCharCode(65) + row;
                var total = '' + String.fromCharCode(69) + row;
                if (sheet[name] == null) {
                    rows[index] = row;
                    index++;
                }

                if ((sheet[name] != null) && (row != 1)) {
                    var poutcomes_record = 'outcomes_record' + row;
                    poutcomes_record = new outcomes_record(sheet[name]['w'], '', '', '', sheet[total]['w']);
                    outcomes_records.push(poutcomes_record);
                }
                for (var col = 65; col <= 89; col++) {
                    var c = String.fromCharCode(col);// get 'A', 'B', 'C' ...
                    var next = '' + c + (row + 1);
                    var key = '' + c + row;
                    var pre_key = '' + c + (row - 1);
                    var td = document.createElement('td');
                    if ((sheet[key] == null) && (sheet[next] == null) && (sheet[pre_key] == null)) {
                        break
                    }
                    if ((sheet[key] == null) && (col == 65 || 69)) {
                        console.info(pre_key)
                        td.innerHTML = sheet[pre_key]['w'];
                    } else {
                        td.innerHTML = sheet[key]['w'];
                    }
                    tr.appendChild(td);

                }
                table.appendChild(tr);
            }
            document.querySelector('#target').appendChild(table);
            var init = 2;
            for (i = 0; i < rows.length; i++) {
                var end = rows[i];
                var c = end + 1;
                for (q = init; q < c; q++) {
                    var project = '' + String.fromCharCode(66) + q;
                    var content = '' + String.fromCharCode(67) + q;
                    var during = '' + String.fromCharCode(68) + q;
                    projects.push(sheet[project]['w']);
                    contents.push(sheet[content]['w']);
                    durings.push(sheet[during]['w']);
                }
                outcomes_records[i].project = projects;
                outcomes_records[i].content = contents;
                outcomes_records[i].during = durings;
                projects = [];
                contents = [];
                durings = [];
                init = c;
            }

        };
        reader.readAsBinaryString(f);
    };
    var outcomes_records = [];
    var index = 0;
    var rows = [];
    var projects = [];
    var contents = [];
    var durings = [];
    $("#ranges02").jeDate({
        range: " To ",
        format: 'YYYY-MM-DD'
    });
    $('.complete').click(function () {
        var data = $('tr').length;
        for (i = 1; i < data; i++) {
            var pname = $('tr:eq(' + i + ")").find('td:eq(0)').text();
            var pproject = $('tr:eq(' + i + ")").find('td:eq(1)').text();
            var pcontent = $('tr:eq(' + i + ")").find('td:eq(2)').text();
            var phour = $('tr:eq(' + i + ")").find('td:eq(3)').text();
            phour = phour.substring(0, phour.length - 1);
            var pcount = $('tr:eq(' + i + ")").find('td:eq(4)').text();
            pcount = pcount.substring(0, pcount.length - 1);
            pnames.push(pname);

            pprojects.push(pproject);
            pcontents.push(pcontent);
            phours.push(phour);
            pcounts.push(pcount)
        }
        var start_time = $('#ranges02').val().substr(0, 10);
        var end_time = $('#ranges02').val().substring(14);
        // console.info(end_time);
        $.ajax({
            url: "/submit/",
            type: "POST",
            traditional: true,
            data: {
                'start_time': start_time,
                'end_time': end_time,
                'name': pnames,
                'project': pprojects,
                'content': pcontents,
                'hour': phours,
                'total': pcounts
            },
            success: function (response) {
                alert('提交成功');
                console.info('你真棒')
            },
            error: function (response) {
                alert('你是不是又没选时间啊我的老天爷')
                console.info('再试试')
            }
        })

    })
});

