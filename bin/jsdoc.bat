
@rem 该批处理文件由 Grunt 工具生成

set name={name}
set version={version}
set template=plain-data

cd ..

set root=..\..
set build=%root%\build
set bin=%root%\bin

set home=%build%\%name%\%version%
set doc=%home%\jsdoc
set src=%home%\src

cd %bin%/jsdoc_toolkit-2.4.0

java -jar jsrun.jar app\run.js -a -D="noGlobal:true" -t=templates\%template% -d=%doc% ^
{list}


cd %home%
cd ..

set dest=%root%\htdocs\data\%name%\%version%

xcopy %home%\*.* %dest%\ /s/e/Y
del %dest%\jsdoc.bat

cd %home%

