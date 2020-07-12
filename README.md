# doador
Webservice para doar roupas (teste)



//camisas do carianos
select category, d.address->>'neighborhood' from donator.product p
join donator.donation d using (id_donation);