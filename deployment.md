Create an instance in AWS
Security: 80, 0.0.0.0
          443, 0.0.0.0
          RDP
          SSH
get key => journey.pem to ssh in
ssh -i "journey.pem" ubuntu@(dns-address)
MySQL - giveitapass

sudo apt-get update
sudo apt-get install mysql-server
sudo mysql_secure_installation
sudo mysql_install_db
sudo apt-get git
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get npm
git clone https://github.com/scrumptiousAmpersand/journey.git

Elastic Ip?
Redirect to port 3000 with (http)
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

Change localhost to ip address in all pages

sudo apt-get install screen
screen -d -m gulp (may just be npm start)