cd $WERCKER_SOURCE_DIR
tar cvf code.tar * > /dev/null
mv code.tar /usr/src/app
cd /usr/src/app
tar xvf code.tar > /dev/null
unlink code.tar
