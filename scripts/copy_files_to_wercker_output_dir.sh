tar cvf code.tar --exclude="_builds/*" --exclude="_projects/*" --exclude="_steps/*" --exclude=".git/*" * > /dev/null
mv code.tar $WERCKER_OUTPUT_DIR
cd $WERCKER_OUTPUT_DIR
tar xvf code.tar > /dev/null
unlink code.tar
