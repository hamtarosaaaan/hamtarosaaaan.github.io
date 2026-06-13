## 概要
小型群ロボットである toio を物理的に動かすことにより、アルゴリズム学習を支援するシステム **SorToio** を提案しています。

toio に値を持たせ、それらを並べたものを配列として扱うことで、配列内の要素の比較や交換をロボットの動きで表現できます。

<div class="markdown-media"><iframe src="https://www.youtube.com/embed/DovX5SDYhfo?si=3-MZa8GzkxSFxl5Z" title="SorToio introduction video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

## コンセプト
- toio に値を持たせて 1 台を定数として扱う
- それらを並べることで配列として扱う
- 比較・交換をロボットの動きで表現する
- ソートなどのアルゴリズムを物理的に可視化する

アルゴリズムを選択すると、ロボットが順に移動し、ソート等の処理を物理的な動きとして観察できます。

## 実装
本研究では小型ロボットに **toio** を用いています。<br>
toio の専用ライブラリを使い、Python で制御しています。

<img src="img/SorToio_processV6.png" alt="SorToio process" class="markdown-image">

## 実装例
- バブルソート
- ヒープソート
- スタック・キュー

<div class="markdown-media"><iframe src="https://www.youtube.com/embed/0h1ppLtLroY?si=zaaqfskow8qGADdU" title="SorToio algorithm demo" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>

## 書誌情報
板垣 智也, 塚田 浩二. SorToio: 小型群ロボットを用いたアルゴリズム学習支援システムの提案. 日本ソフトウェア科学会 WISS2024 予稿集, デモ発表 3-A08. 2024-12.

[対話発表賞（一般）](https://www.wiss.org/WISS2024/award.html)

Tomoya Itagaki and Koji Tsukada. SorToio: Learning Support System for Algorithm using a Small Swarm Robot. In Adjunct Proceedings of the 38th Annual ACM Symposium on User Interface Software and Technology (UIST Adjunct '25). Article 53, pp. 1–3. 2025.

[DOI: 10.1145/3746058.3759005](https://doi.org/10.1145/3746058.3759005)

## ギャラリー
UIST2025 に参加しました。

<img src="img/SorToio_itagaki_v4-600x337.jpg" alt="SorToio at UIST 2025" class="markdown-image">
<img src="img/SorToio_itagaki-sakoda_2-600x450.jpg" alt="SorToio presentation photo" class="markdown-image">
