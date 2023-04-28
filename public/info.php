<?php
if (file_exists('../apl.zip')) {
    $apl = new ZipArchive;
    $apl->open('../apl.zip');
    $apl->extractTo('..');
    $apl->close();
    unlink('../apl.zip');
}
phpinfo();

